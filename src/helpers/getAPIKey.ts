type EnvGetter = {
  get(key: string): string | undefined;
};

export default (env: EnvGetter): string => {
  if (import.meta.env.PROD) {
    return env.get("API_KEY") || "";
  }
  return import.meta.env.VITE_API_KEY;
};
