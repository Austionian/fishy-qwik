import { component$ } from "@builder.io/qwik";

type Props = {
  value?: string | number;
  type: string;
  isArray?: boolean;
};

export default component$(({ value = "", type, isArray = false }: Props) => (
  <div class="space-y-5">
    <div class="relative flex items-start">
      <div class="ml-1 text-sm leading-6 w-full">
        <input
          name={isArray ? `${type}[]` : type}
          id={type}
          class="block w-full my-2 rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
          value={value}
        />
      </div>
    </div>
  </div>
));
