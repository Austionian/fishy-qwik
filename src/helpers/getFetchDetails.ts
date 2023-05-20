type EnvGetter = {
  get(key: string): string | undefined;
};

export default (env: EnvGetter): { apiKey: string; domain: string } => {
  if (import.meta.env.PROD) {
    return {
      apiKey: env.get("API_KEY") || "",
      domain: env.get("API_DOMAIN") || "",
    };
  }
  return {
    apiKey: import.meta.env.VITE_API_KEY,
    domain: import.meta.env.VITE_API_DOMAIN,
  };
};
