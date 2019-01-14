import Chart from 'chart.js';

export async function plotData(xs, ys) {
  const ctx = document.getElementById('data-chart').getContext('2d');

  const xvals = await xs.data();
  const yvals = await ys.data();

  const values = Array.from(yvals).map((y, i) => {
    return {
      x: xvals[i],
      y: y
    };
  });

  const myChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Data',
          data: values
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            type: 'linear',
            position: 'bottom'
          }
        ]
      }
    }
  });
}

export async function plotPredictions(xs, ys, preds) {
  const ctx = document.getElementById('pred-chart').getContext('2d');

  const xval = await xs.data();
  const yval = await ys.data();
  const predval = await preds.data();

  const values = Array.from(yval).map((y, i) => {
    return {
      x: xval[i],
      y: predval[i]
    };
  });

  const mychart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Data',
          data: values
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            type: 'linear',
            position: 'bottom'
          }
        ]
      }
    }
  });
}
