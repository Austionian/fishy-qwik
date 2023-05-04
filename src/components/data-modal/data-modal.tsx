import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { animate } from "motion";
import type { DataPoint } from "~/types/DataPoint";
import type Fish from "~/types/Fish";

type infoModalProps = {
  showDataModal: {
    value: boolean;
  };
  fishData: Fish;
  dataPoint: DataPoint;
};

export default component$(({ showDataModal, dataPoint }: infoModalProps) => {
  const backdropRef = useSignal<Element>();
  const modalRef = useSignal<Element>();

  useVisibleTask$(({ track }) => {
    track(() => showDataModal.value);
    if (backdropRef.value && modalRef.value) {
      if (showDataModal.value) {
        animate(
          backdropRef.value,
          { opacity: [0, 100] },
          {
            duration: 0.1,
            easing: "ease-out",
          }
        );
        animate(
          modalRef.value,
          { opacity: [0, 100], scale: [0.95, 1] },
          {
            duration: 0.1,
            easing: "ease-out",
          }
        );
      } else {
        animate(
          backdropRef.value,
          { opacity: [100, 0] },
          {
            duration: 0.2,
            easing: "ease-in",
          }
        );
      }
    }
  });

  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={backdropRef}
        class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
      ></div>

      <div ref={modalRef} class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <div class="ml-auto pl-3 text-right">
                <div class="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    class="inline-flex rounded-md p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
                    onClick$={() => (showDataModal.value = false)}
                  >
                    <span class="sr-only">Dismiss</span>
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                <svg
                  width="100pt"
                  height="100pt"
                  version="1.1"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m91.934 47.734c-3.0352 0-5.5352 2.2344-5.9648 5.1328h-27.168c-0.066406-0.66797-0.19922-1.3008-0.39844-1.9336l21.867-9.7656c0.89844 1.1992 2.5352 1.6992 3.9648 1.1016 1.7344-0.69922 2.5352-2.6992 1.832-4.3984-0.69922-1.7344-2.6992-2.5352-4.3984-1.832-1.5 0.63281-2.332 2.1992-2.0352 3.7656l-21.832 9.7344c-0.30078-0.53516-0.63281-1.0664-1-1.5352l8.4336-8.2344c2.3672 1.8672 5.8008 1.7344 7.9648-0.43359 2.3672-2.3672 2.3672-6.168 0-8.5352-2.3672-2.3672-6.168-2.3672-8.5352 0-2.1328 2.1328-2.3008 5.5-0.53516 7.8672l-8.4336 8.2344c-0.76562-0.66797-1.668-1.1992-2.6328-1.6016l9.8672-23.434c1.5 0.19922 2.9648-0.60156 3.5664-2.0352 0.69922-1.7344-0.10156-3.6992-1.832-4.3984-1.7344-0.69922-3.6992 0.10156-4.3984 1.832-0.63281 1.5-0.066406 3.1992 1.2344 4.1016l-9.8984 23.535c-0.33203-0.066406-0.66797-0.10156-1-0.13281v-29.203c2.9648-0.36719 5.2656-2.8984 5.2656-5.9648 0-3.332-2.6992-6.0352-6.0352-6.0352-3.332 0-6.0352 2.6992-6.0352 6.0352 0 3.0664 2.3008 5.6016 5.2656 5.9648v29.199c-0.83203 0.066406-1.6328 0.26562-2.3672 0.53516l-11.465-24.035c1.1992-0.89844 1.6992-2.5352 1.1016-3.9648-0.69922-1.7344-2.6992-2.5352-4.3984-1.832-1.7344 0.69922-2.5352 2.6992-1.832 4.3984 0.63281 1.5 2.1992 2.332 3.7656 2.0352l11.465 24.066c-0.43359 0.26562-0.83203 0.53516-1.2344 0.83203l-8.4297-8.3672c1.7656-2.3672 1.6016-5.6992-0.53516-7.8672-2.3672-2.3672-6.168-2.3672-8.5352 0-2.3672 2.3672-2.3672 6.168 0 8.5352 2.1992 2.1992 5.6016 2.3008 7.9648 0.43359l8.3672 8.3672c-0.43359 0.5-0.80078 1.0352-1.1016 1.6016l-33.102-13.965c0.19922-1.5-0.60156-2.9648-2.0352-3.5664-1.6914-0.73828-3.6914 0.09375-4.3906 1.793-0.69922 1.7344 0.10156 3.6992 1.832 4.3984 1.5 0.63281 3.1992 0.066407 4.1016-1.2344l33.035 13.965c-0.19922 0.63281-0.36719 1.3008-0.43359 1.9648l-23.07 0.007813c-0.43359-2.8984-2.9336-5.1328-5.9648-5.1328-3.332 0-6.0352 2.6992-6.0352 6.0352 0 3.332 2.6992 6.0352 6.0352 6.0352 3.1016 0 5.668-2.332 6-5.3672h23.035c0.066406 0.86719 0.23437 1.6992 0.53516 2.4648l-9.6992 4.332c-0.89844-1.1992-2.5352-1.6992-3.9648-1.1016-1.7344 0.69922-2.5352 2.6992-1.832 4.3984 0.69922 1.7344 2.6992 2.5352 4.3984 1.832 1.5-0.63281 2.332-2.1992 2.0352-3.7656l9.6992-4.332c0.23438 0.43359 0.53516 0.83203 0.83203 1.2344l-22.508 22c-2.3672-1.7656-5.6992-1.6016-7.8672 0.53516-2.3672 2.3672-2.3672 6.168 0 8.5352 2.3672 2.3672 6.168 2.3672 8.5352 0 2.1992-2.1992 2.3008-5.6016 0.43359-7.9648l22.5-21.965c0.26562 0.23438 0.5 0.43359 0.80078 0.63281l-5.9648 14.168c-1.5-0.19922-2.9648 0.60156-3.5664 2.0352-0.69922 1.7344 0.10156 3.6992 1.832 4.3984 1.7344 0.69922 3.6992-0.10156 4.3984-1.832 0.63281-1.5 0.066406-3.1992-1.2344-4.1016l5.8672-13.934c0.93359 0.43359 1.9336 0.69922 3 0.80078v16.859c-2.9648 0.36719-5.2656 2.8984-5.2656 5.9648 0 3.332 2.6992 6.0352 6.0352 6.0352 3.332 0 6.0352-2.6992 6.0352-6.0352 0-3.0664-2.3008-5.6016-5.2656-5.9648v-16.898c0.86719-0.066406 1.668-0.26562 2.4648-0.56641l13.434 28.168c-1.1992 0.89844-1.6992 2.5352-1.1016 3.9648 0.69922 1.7344 2.6992 2.5352 4.3984 1.832 1.7344-0.69922 2.5352-2.6992 1.832-4.3984-0.63281-1.5-2.1992-2.332-3.7656-2.0352l-13.465-28.199c0.46484-0.26562 0.86719-0.56641 1.2656-0.89844l23.734 23.734c-1.8672 2.3672-1.7344 5.8008 0.43359 7.9648 2.3672 2.3672 6.168 2.3672 8.5352 0 2.3672-2.3672 2.3672-6.168 0-8.5352-2.1328-2.1328-5.5-2.3008-7.8672-0.53516l-23.734-23.734c0.39844-0.5 0.76562-1.0352 1.0664-1.6016l11.535 4.8672c-0.19922 1.5 0.60156 2.9648 2.0352 3.5664 1.7344 0.69922 3.6992-0.10156 4.3984-1.832 0.69922-1.7344-0.10156-3.6992-1.832-4.3984-1.5-0.63281-3.1992-0.066406-4.1016 1.2344l-11.465-4.832c0.19922-0.66797 0.33203-1.3672 0.39844-2.0664h27.133c0.33203 3 2.8672 5.3672 6 5.3672 3.332 0 6.0352-2.6992 6.0352-6.0352-0.007812-3.3359-2.707-6.0664-6.0391-6.0664z" />
                </svg>
              </div>
              <div class="mt-5 text-center sm:mt-5">
                <h3
                  class="text-xl font-semibold leading-6 text-gray-900 mb-3"
                  id="modal-title"
                >
                  {dataPoint.title}
                </h3>
                {dataPoint.about.map((p, i) => (
                  <div class="text-left mt-2" key={i}>
                    <p
                      class="text-base leading-6 text-gray-800"
                      id="modal-about"
                    >
                      {p}
                    </p>
                  </div>
                ))}
                {dataPoint.moreInfo && (
                  <div class="mt-5 text-left">
                    <h4
                      class="text-lg font-semibold leading-6 text-gray-900"
                      id="modal-about"
                    >
                      Avoidance
                    </h4>
                    <p class="text-base leading-6 text-gray-800">
                      {dataPoint.moreInfo}
                    </p>
                  </div>
                )}
                <div class="mt-5">
                  <a
                    href={dataPoint.link}
                    class="text-teal-500 hover:text-teal-400 font-bold"
                  >
                    Visit CDC.gov to learn more.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
