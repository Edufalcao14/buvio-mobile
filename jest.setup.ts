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

// The device locale is native; tests run in the shipped default, English.
jest.mock("expo-localization", () => ({
  getLocales: () => [
    { languageCode: "en", languageTag: "en-US", regionCode: "US" },
  ],
}));

// Native-only modules the screens use for feel, never for what they show.
jest.mock("expo-haptics", () => ({
  selectionAsync: jest.fn(async () => {}),
  impactAsync: jest.fn(async () => {}),
  notificationAsync: jest.fn(async () => {}),
  ImpactFeedbackStyle: { Light: "light", Medium: "medium", Heavy: "heavy" },
  NotificationFeedbackType: {
    Success: "success",
    Error: "error",
    Warning: "warning",
  },
}));

jest.mock("react-native-svg", () => {
  const React = require("react");
  const { View } = require("react-native");
  const Stub = (props: any) => React.createElement(View, props, props.children);
  return {
    __esModule: true,
    default: Stub,
    Svg: Stub,
    Circle: Stub,
    Path: Stub,
    G: Stub,
    Rect: Stub,
    Defs: Stub,
    Stop: Stub,
    RadialGradient: Stub,
    LinearGradient: Stub,
  };
});

jest.mock("@react-native-segmented-control/segmented-control", () => {
  const React = require("react");
  const { View, Pressable, Text } = require("react-native");
  // A row of pressables, so a test can still pick a segment by its label.
  const Stub = ({ values = [], selectedIndex, onChange }: any) =>
    React.createElement(
      View,
      { accessibilityRole: "radiogroup" },
      values.map((label: string, index: number) =>
        React.createElement(
          Pressable,
          {
            key: label,
            accessibilityRole: "radio",
            accessibilityState: { selected: index === selectedIndex },
            onPress: () =>
              onChange?.({ nativeEvent: { selectedSegmentIndex: index } }),
          },
          React.createElement(Text, null, label)
        )
      )
    );
  return { __esModule: true, default: Stub };
});

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
