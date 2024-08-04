export const getBaseUrlFromEnv = () => {
  const urlFromEnvironment = {
    development: import.meta.env.VITE_PUBLIC_URL,
    production: import.meta.env.VITE_PUBLIC_URL,
    testing: import.meta.env.VITE_PUBLIC_URL,
  };
  const env = import.meta.env.MODE;
  return urlFromEnvironment[env];
};
