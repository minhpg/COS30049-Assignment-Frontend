import Chart from "react-apexcharts";
import { useState, useEffect } from "react";

import { getYearlyVolume } from "../../../../api/models/Statistics";

const OPTIONS = {
  chart: {
    type: "area",
    animations: {
      easing: "linear",
      speed: 300,
    },
    sparkline: {
      enabled: false,
    },
    brush: {
      enabled: false,
    },
    fontFamily: "Inter, sans-serif",
    foreColor: "var(--nextui-colors-accents9)",
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: false,
  },

  xaxis: {
    labels: {
      categories: [2017,2018,2019,2020,2021],
      show: false,
      style: {
        colors: "var(--nextui-colors-accents8)",
        fontFamily: "Inter, sans-serif",
      },
    },
    axisBorder: {
      color: "var(--nextui-colors-border)",
    },
    axisTicks: {
      color: "var(--nextui-colors-border)",
    },
  },
  yaxis: {
    show: false,
    labels: {
      style: {
        colors: "var(--nextui-colors-accents8)",
        fontFamily: "Inter, sans-serif",
      },
      formatter: (value) => value / 1e6 + "M",
    },
  },
  grid: {
    show: true,
    borderColor: "var(--nextui-colors-border)",
    strokeDashArray: 0,
    position: "back",
  },
  stroke: {
    curve: "smooth",
    fill: {
      colors: ["red"],
    },
  },
  // @ts-ignore
  markers: false,
};

const ChartYearlyVolume = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    const dataFetch = async () => {
      const response = await getYearlyVolume();
      setState([
        {
          series: "Txn Volume",
          data: response.map((item) => item.transactions),
        },
      ]);
    };
    dataFetch();
  }, []);

  return <Chart options={OPTIONS} series={state} type="area" />;
};

export default ChartYearlyVolume;
