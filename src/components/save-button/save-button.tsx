import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { animate } from "motion";

type Props = {
  validating: {
    value: boolean;
  };
  saveValue: {
    value: string;
  };
};

export default component$(({ validating, saveValue }: Props) => {
  const saveRef = useSignal<HTMLElement>();

  useVisibleTask$(({ track }) => {
    track(() => saveValue.value);
    if (saveRef.value) {
      if (saveValue.value !== "Save") {
        animate(
          saveRef.value,
          { scale: [0.5, 2, 1], opacity: [0, 1] },
          { duration: 0.5, easing: "ease-in" }
        );
      }
    }
  });

  return (
    <button
      type="submit"
      class="inline-flex justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      onClick$={() => (validating.value = true)}
    >
      {validating.value ? (
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#fff"
          class="h-5 w-5"
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.7s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      ) : (
        <span ref={saveRef}>{saveValue.value}</span>
      )}
    </button>
  );
});
