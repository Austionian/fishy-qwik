import { component$ } from "@builder.io/qwik";
import { LAKES } from "~/constants/lakes";

type Props = {
  filterBy: {
    value: string;
  };
};

export default component$(({ filterBy }: Props) => (
  <div class="flex flex-row">
    {LAKES.map(
      (lake, i) =>
        lake.name !== "Store" && (
          <div class={i === 0 ? "mr-2 mb-2" : "mb-2 mx-2"} key={i}>
            <button
              type="button"
              class={
                filterBy.value === lake.name
                  ? `inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-200
                 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 dark:ring-gray-500 items-center cursor-default
                 dark:bg-gray-600/80 dark:text-white`
                  : `inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white
                 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 items-center focus:ring-offset-teal-500
                 focus:ring-gray-50 focus:ring-offset-2 focus:outline-none
                 dark:bg-gray-900/80 dark:text-white dark:hover:bg-gray-700`
              }
              id={`filter-by-${lake.name}`}
              aria-label={lake.name}
              onClick$={() => {
                filterBy.value = lake.name;
                const url = new URL(window.location.href);
                url.searchParams.set("lake", lake.name);
                window.history.pushState(null, "", url.toString());
              }}
            >
              <span class="fill-gray-400" dangerouslySetInnerHTML={lake.svg} />
              <span class="hidden sm:block">{lake.name}</span>
            </button>
          </div>
        )
    )}
  </div>
));
