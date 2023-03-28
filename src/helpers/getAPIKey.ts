import { useServerData } from "@builder.io/qwik";

export default (): string => {
  if (import.meta.env.PROD) {
    return useServerData("API_KEY") || "";
  }
  return import.meta.env.VITE_API_KEY;
};
