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
                 ring-inset ring-gray-300 items-center cursor-default`
                  : `inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white
                 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 hover:bg-gray-50 items-center focus:ring-offset-teal-500
                 focus:ring-gray-50 focus:ring-offset-2 focus:outline-none`
              }
              id="sort-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
              onClick$={() => (filterBy.value = lake.name)}
            >
              <span class="fill-gray-400" dangerouslySetInnerHTML={lake.svg} />
              <span class="hidden sm:block">{lake.name}</span>
            </button>
          </div>
        )
    )}
  </div>
));
