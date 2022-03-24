/* eslint-disable no-undef */
const chart = echarts.init(document.getElementById('canvas'));

const option = {
  tooltip: {},
  series: [
    {
      type: 'wordCloud',
      gridSize: 8,
      sizeRange: [8, 80],
      rotationRange: [0, 0],
      // rotationStep: 90,
      shape: 'square',
      left: 'center',
      top: 'center',
      width: '80%',
      height: '60%',
      right: 'center',
      bottom: 'center',
      drawOutOfBound: true,
      layoutAnimation: true,
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color() {
          return `rgb(${[
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 120),
            Math.round(Math.random() * 180),
          ].join(',')})`;
        },
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333',
        },
      },
      data: wordsFrequency,
    },
  ],
};

chart.setOption(option);

window.onresize = chart.resize;
