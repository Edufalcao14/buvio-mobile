import { getEnvironmentVariables } from "../env-variables";
import { Environment } from "../../types/environment";

export function getEnvironmentBaseURL() {
  const environment = getEnvironmentVariables();

  switch (environment) {
    case Environment.DEMO:
      return process.env.EXPO_PUBLIC_URL_DEMO;
    case Environment.QA:
      return process.env.EXPO_PUBLIC_URL_QA;
    case Environment.PRODUCTION:
      return process.env.EXPO_PUBLIC_URL_PRODUCTION;
    case Environment.DEVELOPMENT:
      return process.env.EXPO_PUBLIC_URL_DEVELOPMENT;
  }
}