import * as tf from '@tensorflow/tfjs';

function generateData(numPoints, coefficient, sigma = 0.04) {
  return tf.tidy(() => {
    const [a, b, c, d] = [
      tf.scalar(coefficient.a),
      tf.scalar(coefficient.b),
      tf.scalar(coefficient.c),
      tf.scalar(coefficient.d)
    ];

    const xs = tf.randomUniform([numPoints], -1, 1);

    const three = tf.scalar(3, 'int32');

    const ys = a
      .mul(xs.pow(three))
      .add(b.mul(xs.square()))
      .add(c.mul(xs))
      .add(d)
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
