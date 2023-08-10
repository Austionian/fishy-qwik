import type { dataPoints } from "~/constants/dataPoints";

export type DataPoint = {
  title: string;
  query: string;
  about: string[];
  moreInfo?: string;
  postfix: string;
  link: string;
};

export type ChartData = {
  name: string;
  anishinaabe_name: string;
  value: number;
};

export type Points = keyof typeof dataPoints;
