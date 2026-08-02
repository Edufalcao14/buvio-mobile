

export const getEnvironmentVariables = () => {
  const env = process.env.EXPO_PUBLIC_ENV
  if (!env) {
    throw new Error("Environment variables not properly configured");
  }
  return env as string;
};