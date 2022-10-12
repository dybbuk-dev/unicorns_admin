import { lineHeight } from '@mui/system';
import typography from 'src/mui/assets/theme/base/typography';

function configs(labels: any, datasets: any) {
  return {
    data: {
      labels,
      datasets: [...datasets],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: '#000000',
            usePointStyle: true,
            pointStyle: 'line',
            font: {
              size: 14,
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: '#273444',
            font: {
              size: 14,
              family: typography.fontFamily,
              style: 'normal',
              lineHeight: 2,
            },
            callback: function (value, index, ticks) {
              return value + ' ETH';
            },
          },
        },
        x: {
          grid: {
            drawBorder: true,
            display: true,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: '#273444',
            padding: 20,
            font: {
              size: 14,
              family: typography.fontFamily,
              style: 'normal',
              lineHeight: 2,
            },
          },
        },
      },
    },
  };
}

export default configs;
