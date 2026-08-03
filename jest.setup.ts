/**
 * Global test setup.
 *
 * Everything mocked here is infrastructure the screens sit on but never
 * assert about: fonts (native), routing (needs a real navigator) and toasts
 * (a portal outside the tree under test).
 */
// Fonts are loaded natively; in tests they are always "ready".
jest.mock("expo-font", () => ({
  useFonts: () => [true, null],
  isLoaded: () => true,
  loadAsync: jest.fn(async () => {}),
}));

jest.mock("@expo-google-fonts/baloo-2", () => ({
  useFonts: () => [true, null],
  Baloo2_600SemiBold: "Baloo2_600SemiBold",
  Baloo2_700Bold: "Baloo2_700Bold",
  Baloo2_800ExtraBold: "Baloo2_800ExtraBold",
}));

// A single router double, so a test can assert on navigation without
// standing up an Expo Router root. Tests read it with
// `import { router } from "expo-router"` / `useRouter()`.
jest.mock("expo-router", () => {
  const React = require("react");
  const { Text } = require("react-native");

  const router = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    navigate: jest.fn(),
    dismiss: jest.fn(),
    setParams: jest.fn(),
  };

  return {
    router,
    useRouter: () => router,
    useLocalSearchParams: () => ({}),
    useSegments: () => [],
    usePathname: () => "/",
    useFocusEffect: () => {},
    Link: ({ children, ...props }: any) =>
      React.createElement(Text, props, children),
    Redirect: () => null,
    Stack: () => null,
    Slot: () => null,
  };
});

jest.mock("react-native-toast-message", () => ({
  __esModule: true,
  default: { show: jest.fn(), hide: jest.fn() },
  show: jest.fn(),
  hide: jest.fn(),
}));

// react-native-calendars pulls in a lot of native surface for the one screen
// that shows a date picker; the tests here never assert on the calendar grid.
jest.mock("react-native-calendars", () => ({
  Calendar: () => null,
  CalendarList: () => null,
  Agenda: () => null,
  LocaleConfig: { locales: {}, defaultLocale: "" },
}));
