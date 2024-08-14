import ApexCharts from "apexcharts";

export const getChartOptions = (series, colors, labels) => {
  return {
    series,
    colors,
    chart: {
      height: "240",
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Lexend Deca, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: "",
              fontFamily: "Lexend Deca, sans-serif",
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
                return "" + sum + ""; //$ + k
              },
            },
            value: {
              show: true,
              fontFamily: "Lexend Deca, sans-serif",
              offsetY: -10,
              formatter: function (value) {
                return value + ""; // k
              },
            },
          },
          size: "65%", //
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels,
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      fontFamily: "Lexend Deca, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + ""; //k
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + ""; //k
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
};

export const initChart = (chartElement, data) => {
  if (chartElement && typeof ApexCharts !== "undefined") {
    const chart = new ApexCharts(
      chartElement,
      getChartOptions(data.series, data.colors, data.labels)
    );
    chart.render();

    return () => {
      chart.destroy();
    };
  }
};
