import * as tf from '@tensorflow/tfjs';
import './style.css';
import generateData from './data';
import { plotData, plotPredictions } from './ui';

function linearRegression(trueCoefficients) {
  // Generate random variables
  const a = tf.variable(tf.scalar(Math.random()));
  const b = tf.variable(tf.scalar(Math.random()));
  const c = tf.variable(tf.scalar(Math.random()));

  // Iteration number for epoch
  const numIterations = 80;

  // Learning rate
  const learningRate = 0.5;

  // Optimaizer that uses stochastic descent
  const optimizer = tf.train.sgd(learningRate);

  // Define predict funtion
  function predict(x) {
    return tf.tidy(() => {
      return a
        .mul(x.pow(tf.scalar(2)))
        .add(b.mul(x))
        .add(c);
    });
  }

  // Define loss function
  function loss(prediction, label) {
    const error = prediction
      .sub(label)
      .square()
      .mean();
    return error;
  }

  // Training function
  async function train(xs, ys, numIterations) {
    for (let i = 0; i < numIterations; i++) {
      optimizer.minimize(() => {
        const pred = predict(xs);
        return loss(pred, ys);
      });
    }
    await tf.nextFrame();
  }

  // Learn coefficient
  async function learnCoefficient() {
    const trainingData = generateData(100, trueCoefficients);

    await plotData(trainingData.xs, trainingData.ys);

    await train(trainingData.xs, trainingData.ys, numIterations);

    const predictionAfter = predict(trainingData.xs);

    await plotPredictions(trainingData.xs, trainingData.ys, predictionAfter);
  }

  learnCoefficient();
}

linearRegression(trueCoefficient);

const trueCoefficient = { a: 1, b: 1, c: 1 };
const items = Array.from(document.querySelectorAll('.item'));

items.map(item => {
  item.addEventListener('change', e => {
    const type = item.dataset.type;
    trueCoefficient[type] = parseInt(e.target.value, 10);
    linearRegression(trueCoefficient);
  });
});

export default linearRegression;
