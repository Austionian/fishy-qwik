import { component$ } from "@builder.io/qwik";

type Props = {
  href: string;
  text: string;
  alwaysShow?: boolean;
};

export default component$(({ href, text, alwaysShow = false }: Props) => (
  <div
    class={`${
      alwaysShow ? "flex" : "hidden sm:flex"
    } mx-auto max-w-3xl px-4 sm:px-6 md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8 mb-6`}
  >
    <a href={href} class="hover:text-teal-500 hover:cursor-pointer">
      ‹ Back to {text}
    </a>
  </div>
));
