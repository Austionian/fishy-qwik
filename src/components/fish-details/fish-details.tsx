import { component$ } from "@builder.io/qwik";
import { dataPoints } from "~/constants/dataPoints";
import type { DataPoint, Points } from "~/types/DataPoint";
import type Fish from "~/types/Fish";

type Props = {
  fish: Fish;
  index: boolean;
};

export default component$(({ fish }: Props) => (
  <div class="grid grid-cols-4 gap-x-4 gap-y-8">
    {Object.keys(dataPoints).map((point, i) => {
      const key = point as Points;
      const data: DataPoint = dataPoints[key];
      return (
        <div class="sm:col-span-1" key={i}>
          <dl>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-100">
              {data.title}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
              {fish[key].toFixed(3)}
              <span class="text-xs text-gray-700 dark:text-gray-300">
                {data.postfix}
              </span>
            </dd>
          </dl>
        </div>
      );
    })}
  </div>
));
