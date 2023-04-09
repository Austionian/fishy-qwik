import { isBrowser } from "@builder.io/qwik/build";

export default () => {
  if (isBrowser) {
    window.localStorage.clear();
  }
};
