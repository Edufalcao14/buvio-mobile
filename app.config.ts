import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Buvio-Frontend",
  slug: "Buvio-Frontend",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "Buvio-app",
  userInterfaceStyle: "automatic",
  extra: {
    ENV: process.env.APP_ENV ?? "development",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.anonymous.BuvioFrontend",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#1B4D3E",
    },
    package: "com.anonymous.BuvioFrontend",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-image",
    "expo-status-bar",
    // Avatars and crests are picked from the library only — Buvio never asks
    // for the camera, so the camera permission is switched off rather than
    // left to the plugin's default.
    [
      "expo-image-picker",
      {
        photosPermission:
          "Buvio accède à tes photos pour choisir ta photo de profil ou le blason de ton équipe.",
        cameraPermission: false,
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./assets/icon-full-body.png",
        resizeMode: "contain",
        backgroundColor: "#1B4D3E",
      },
    ],
  ],
  experiments: {
    reactCompiler: true,
  },
});
