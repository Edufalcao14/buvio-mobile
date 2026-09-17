import { ExpoConfig, ConfigContext } from "expo/config";

/**
 * One source for the version, and a build number the CI supplies.
 *
 * These used to be a literal "1.0.0" maintained by hand in two files, with no
 * build number at all - so two consecutive store uploads would collide.
 */
const VERSION = "1.0.0";
const BUILD_NUMBER = process.env.EAS_BUILD_NUMBER ?? "1";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Buvio",
  slug: "buvio",
  version: VERSION,
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "buvio",
  userInterfaceStyle: "automatic",
  // One environment variable, not two. `EXPO_PUBLIC_ENV` is what the app
  // actually reads (src/utils/env-variables), so the build must not publish a
  // second, unrelated one under `extra` that nothing consumes.
  extra: {
    eas: { projectId: process.env.EAS_PROJECT_ID },
  },
  // Over-the-air updates: without them a crash-on-launch waits days for a
  // store review. `runtimeVersion` follows the native fingerprint, so an
  // update is only ever offered to a binary that can actually run it.
  updates: {
    url: process.env.EAS_UPDATE_URL,
    fallbackToCacheTimeout: 0,
  },
  runtimeVersion: { policy: "fingerprint" },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.buvio.app",
    buildNumber: BUILD_NUMBER,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#1B4D3E",
    },
    package: "com.buvio.app",
    versionCode: Number(BUILD_NUMBER),
    // The session tokens live in the Keystore, but anything else the app
    // writes should not ride an automatic cloud backup off the device.
    allowBackup: false,
    permissions: [],
    blockedPermissions: [
      // Autolinking defaults that nothing in src/ uses. RECORD_AUDIO and
      // SYSTEM_ALERT_WINDOW in particular are review flags, and the latter is
      // a tapjacking surface.
      "android.permission.RECORD_AUDIO",
      "android.permission.SYSTEM_ALERT_WINDOW",
      "android.permission.CAMERA",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE",
    ],
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
    // Crash and error reporting. Without a DSN the plugin is inert, so a
    // local build stays quiet and CI builds report.
    [
      "@sentry/react-native/expo",
      {
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
      },
    ],
    "expo-secure-store",
    "expo-updates",
  ],
  experiments: {
    reactCompiler: true,
  },
});
