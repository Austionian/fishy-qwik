import type { dataPoints } from "~/constants/dataPoints";

type DataPoint = {
  title: string;
  about: string;
  moreInfo?: string;
  postfix: string;
};

type Points = keyof typeof dataPoints;

export { DataPoint, Points };
