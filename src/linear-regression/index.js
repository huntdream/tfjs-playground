import * as tf from '@tensorflow/tfjs';
import generateData from './data';

function linearRegression() {
  // Generate random variables
  const a = tf.variable(tf.scalar(Math.random()));
  const b = tf.variable(tf.scalar(Math.random()));
  const c = tf.variable(tf.scalar(Math.random()));
  const d = tf.variable(tf.scalar(Math.random()));

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
        .mul(x.pow(tf.scalar(3, 'int32')))
        .add(b.mul(x.square()))
        .add(c.mul(x))
        .add(d);
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
    const trueCoefficients = { a: -0.8, b: -0.2, c: 0.9, d: 0.5 };

    const trainingData = generateData(100, trueCoefficients);
    console.log(trainingData);

    await train(trainingData.xs, trainingData.ys, numIterations);
    console.log(trueCoefficients);
    console.log(
      a.dataSync()[0],
      b.dataSync()[0],
      c.dataSync()[0],
      d.dataSync()[0]
    );
  }

  learnCoefficient();
}

export default linearRegression;
