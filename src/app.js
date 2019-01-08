import * as tf from '@tensorflow/tfjs';

(function() {
  const data = tf.eye(5, 4);
  data.print();
})();
