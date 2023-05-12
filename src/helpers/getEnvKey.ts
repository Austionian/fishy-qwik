type EnvGetter = {
  get(key: string): string | undefined;
};

export default (env: EnvGetter, key: string): string => {
  if (import.meta.env.PROD) {
    return env.get(key) || "";
  }
  const viteKey = `VITE_${key}`;
  return import.meta.env[viteKey];
};
