import * as tf from '@tensorflow/tfjs';

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
    return a.mul(x).add(b);
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
