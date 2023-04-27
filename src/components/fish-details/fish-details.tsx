import { component$ } from "@builder.io/qwik";
import type Fish from "~/types/Fish";

type Props = {
  fish: Fish;
  index: boolean;
};

export default component$(({ fish, index }: Props) => (
  <dl
    class={
      index
        ? "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2"
        : "grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2"
    }
  >
    <div class="sm:col-span-1">
      <div class="flex items-center">
        <dt class="text-sm font-medium text-gray-500">Protein</dt>
        {!index && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100pt"
            height="100pt"
            version="1.1"
            viewBox="0 0 100 100"
            class="h-5 cursor-pointer w-5 hover:fill-teal-500"
            onClick$={() => alert("heelo")}
          >
            <path d="m50 16.918c-18.242 0-33.086 14.84-33.086 33.082s14.844 33.082 33.086 33.082 33.086-14.84 33.086-33.082-14.844-33.082-33.086-33.082zm0 62.164c-16.035 0-29.086-13.047-29.086-29.082s13.051-29.082 29.086-29.082 29.086 13.047 29.086 29.082-13.051 29.082-29.086 29.082zm-2-39.832h4v-6.168h-4zm0 27.668h4v-23.418h-4z" />
          </svg>
        )}
      </div>
      <dd class="mt-1 text-sm text-gray-900">
        {fish.protein}
        <span class="text-xs text-gray-700">g per 100g</span>
      </dd>
    </div>
    <div class="sm:col-span-1">
      <div class="flex items-center">
        <dt class="text-sm font-medium text-gray-500">PCB</dt>
        {!index && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100pt"
            height="100pt"
            version="1.1"
            viewBox="0 0 100 100"
            class="h-5 cursor-pointer w-5 hover:fill-teal-500"
            onClick$={() => alert("heelo")}
          >
            <path d="m50 16.918c-18.242 0-33.086 14.84-33.086 33.082s14.844 33.082 33.086 33.082 33.086-14.84 33.086-33.082-14.844-33.082-33.086-33.082zm0 62.164c-16.035 0-29.086-13.047-29.086-29.082s13.051-29.082 29.086-29.082 29.086 13.047 29.086 29.082-13.051 29.082-29.086 29.082zm-2-39.832h4v-6.168h-4zm0 27.668h4v-23.418h-4z" />
          </svg>
        )}
      </div>
      <dd class="mt-1 text-sm text-gray-900">
        {fish.pcb} <span class="text-xs text-gray-700">ppm</span>
      </dd>
    </div>
    <div class="sm:col-span-1">
      <div class="flex items-center">
        <dt class="text-sm font-medium text-gray-500">Omega 3/6 Ratio</dt>
        {!index && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100pt"
            height="100pt"
            version="1.1"
            viewBox="0 0 100 100"
            class="h-5 cursor-pointer w-5 hover:fill-teal-500"
            onClick$={() => alert("heelo")}
          >
            <path d="m50 16.918c-18.242 0-33.086 14.84-33.086 33.082s14.844 33.082 33.086 33.082 33.086-14.84 33.086-33.082-14.844-33.082-33.086-33.082zm0 62.164c-16.035 0-29.086-13.047-29.086-29.082s13.051-29.082 29.086-29.082 29.086 13.047 29.086 29.082-13.051 29.082-29.086 29.082zm-2-39.832h4v-6.168h-4zm0 27.668h4v-23.418h-4z" />
          </svg>
        )}
      </div>
      <dd class="mt-1 text-sm text-gray-900">{fish.omega_3_ratio}</dd>
    </div>
    <div class="sm:col-span-1">
      <div class="flex items-center">
        <dt class="text-sm font-medium text-gray-500">Mercury</dt>
        {!index && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100pt"
            height="100pt"
            version="1.1"
            viewBox="0 0 100 100"
            class="h-5 cursor-pointer w-5 hover:fill-teal-500"
            onClick$={() => alert("heelo")}
          >
            <path d="m50 16.918c-18.242 0-33.086 14.84-33.086 33.082s14.844 33.082 33.086 33.082 33.086-14.84 33.086-33.082-14.844-33.082-33.086-33.082zm0 62.164c-16.035 0-29.086-13.047-29.086-29.082s13.051-29.082 29.086-29.082 29.086 13.047 29.086 29.082-13.051 29.082-29.086 29.082zm-2-39.832h4v-6.168h-4zm0 27.668h4v-23.418h-4z" />
          </svg>
        )}
      </div>
      <dd class="mt-1 text-sm text-gray-900">
        {fish.mercury} <span class="text-xs text-gray-700">ppm</span>
      </dd>
    </div>
    {!index && (
      <div class="sm:col-span-2">
        <dt class="text-sm font-medium text-gray-500">About</dt>
        <dd class="mt-1 text-sm text-gray-900">
          Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt
          cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint.
          Sit id mollit nulla mollit nostrud in ea officia proident. Irure
          nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
        </dd>
      </div>
    )}
  </dl>
));
// <dl class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2">
//   <div class="sm:col-span-1">
//     <dt class="text-sm font-medium text-gray-500">Protien</dt>
//     <dd class="mt-1 text-sm text-gray-900">
//       {fish.protein}
//       <span class="text-xs text-gray-700">g per 100g</span>
//     </dd>
//   </div>
//   <div class="sm:col-span-1">
//     <dt class="text-sm font-medium text-gray-500">PCB</dt>
//     <dd class="mt-1 text-sm text-gray-900">
//       {fish.pcb} <span class="text-xs text-gray-700">ppm</span>
//     </dd>
//   </div>
//   <div class="sm:col-span-1">
//     <dt class="text-sm font-medium text-gray-500">Omega 3/6 Ratio</dt>
//     <dd class="mt-1 text-sm text-gray-900">{fish.omega_3_ratio}</dd>
//   </div>
//   <div class="sm:col-span-1">
//     <dt class="text-sm font-medium text-gray-500">Mercury</dt>
//     <dd class="mt-1 text-sm text-gray-900">
//       {fish.mercury} <span class="text-xs text-gray-700">ppm</span>
//     </dd>
//   </div>
// </dl>;
