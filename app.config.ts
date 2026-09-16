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
  // No web favicon: `assets/favicon.png` never existed, and pointing the
  // config at a missing file only bought a warning. Expo's default stands
  // until Buvio actually ships a web build.
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
        /*
         * The mascot is a transparent cutout and the green comes from the
         * background, so the splash is one flat field with the goat on it.
         *
         * The plugin centres the image inside a SQUARE box, so `imageWidth` is
         * what the mascot actually gets: without it the plugin falls back to a
         * 100pt logo and the goat ends up a speck.
         */
        image: "./assets/images/sticker_goat.png",
        imageWidth: 260,
        resizeMode: "contain",
        backgroundColor: "#1C4233",
        dark: {
          image: "./assets/images/sticker_goat.png",
          imageWidth: 260,
          resizeMode: "contain",
          backgroundColor: "#0B1D15",
        },
      },
    ],
  ],
  experiments: {
    reactCompiler: true,
  },
});
