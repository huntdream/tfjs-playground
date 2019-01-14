import * as tf from '@tensorflow/tfjs';

function generateData(numPoints, coefficient, sigma = 0.04) {
  return tf.tidy(() => {
    const [a, b, c] = [
      tf.scalar(coefficient.a),
      tf.scalar(coefficient.b),
      tf.scalar(coefficient.c)
    ];

    const xs = tf.randomUniform([numPoints], -1, 1);

    const ys = a
      .mul(xs.pow(tf.scalar(2, 'int32')))
      .add(b.mul(xs))
      .add(c)
      .add(tf.randomNormal([numPoints], 0, sigma));

    const ymin = ys.min();
    const ymax = ys.max();
    const yrange = ymax.sub(ymin);
    const yNormalized = ys.sub(ymin).div(yrange);

    return {
      xs,
      ys: yNormalized
    };
  });
}

export default generateData;
