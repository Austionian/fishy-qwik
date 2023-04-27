import { component$ } from "@builder.io/qwik";
import LAKES from "~/constants/lakes";

type Props = {
  location: string;
};

export default component$(({ location }: Props) => (
  <div class="flex flex-row">
    {LAKES.map(
      (lake, i) =>
        lake.name !== "Store" && (
          <div class="mx-2" key={i}>
            <a href={lake.name === "All" ? "/" : `/lake/${lake.name}/`}>
              <button
                type="button"
                class={
                  location === lake.name ||
                  (location === "/" && lake.name === "All")
                    ? `inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-200
                 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300`
                    : `inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white
                 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 hover:bg-gray-50`
                }
                id="sort-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                {lake.name}
              </button>
            </a>
          </div>
        )
    )}
  </div>
));
