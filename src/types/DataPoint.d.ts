import type { dataPoints } from "~/constants/dataPoints";

type DataPoint = {
  title: string;
  about: string[];
  moreInfo?: string;
  postfix: string;
  link: string;
  chart: {
    high: ChartData;
    low: ChartData;
  };
};

type ChartData = {
  fish: string;
  value: number;
};

type Points = keyof typeof dataPoints;

export { DataPoint, Points };
