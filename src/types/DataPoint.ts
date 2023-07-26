import type { dataPoints } from "~/constants/dataPoints";

type DataPoint = {
  title: string;
  query: string;
  about: string[];
  moreInfo?: string;
  postfix: string;
  link: string;
};

type ChartData = {
  name: string;
  anishinaabe_name: string;
  value: number;
};

type Points = keyof typeof dataPoints;

export { DataPoint, Points, ChartData };
