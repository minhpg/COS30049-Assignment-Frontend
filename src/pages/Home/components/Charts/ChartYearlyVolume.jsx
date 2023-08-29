import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
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
      show: true,
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
  const [options, setOptions] = useState(OPTIONS);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await getYearlyVolume();
      const new_options = OPTIONS;
      new_options.xaxis.categories = response.map((item) => item.year);
      setOptions(new_options);
      const volume_data = response.map((item) => item.transactions);
      setState([
        {
          series: "Transactions",
          data: volume_data,
        },
      ]);
    };
    dataFetch();
  }, []);

  return <Chart options={options} series={state} type="area" />;
};

export default ChartYearlyVolume;
