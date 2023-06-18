import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { animate } from "motion";
import Spinner from "../spinner/spinner";

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
        <Spinner />
      ) : (
        <span ref={saveRef}>{saveValue.value}</span>
      )}
    </button>
  );
});
