import '@babel/polyfill';
import linearRegression from './linear-regression';
import './style.css';

const trueCoefficient = { a: 1, b: 1, c: 1 };
linearRegression(trueCoefficient);

const items = Array.from(document.querySelectorAll('.item'));

items.map(item => {
  item.addEventListener('change', e => {
    const type = item.dataset.type;
    trueCoefficient[type] = parseInt(e.target.value, 10);
    linearRegression(trueCoefficient);
  });
});
