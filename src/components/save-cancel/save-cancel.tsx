import { component$ } from "@builder.io/qwik";
import SaveButton from "~/components/save-button/save-button";

type Props = {
  validating: {
    value: boolean;
  };
  saveValue: {
    value: string;
  };
  cancelHref: string;
};

export default component$(({ validating, saveValue, cancelHref }: Props) => (
  <div class="divide-y divide-gray-200 dark:divide-white/10 pt-6">
    <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
      <a href={cancelHref}>
        <button
          type="button"
          class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10 dark:hover:text-white dark:ring-white/10"
        >
          Cancel
        </button>
      </a>
      <SaveButton validating={validating} saveValue={saveValue} />
    </div>
  </div>
));
