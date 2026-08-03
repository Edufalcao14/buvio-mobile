import React, { ReactElement, ReactNode } from "react";
import { render as rntlRender, RenderOptions } from "@testing-library/react-native";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/providers/ThemeProvider";

const SAFE_AREA_METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

type Options = Omit<RenderOptions, "wrapper"> & {
  /** Apollo responses for the queries the screen fires. */
  mocks?: readonly MockedResponse[];
};

/**
 * Renders a screen with the providers every screen assumes: the theme (read
 * through `useTheme`), Apollo (mocked), and safe-area metrics.
 *
 * Fonts, routing and toasts are mocked globally in `jest.setup.ts`.
 */
export const renderWithProviders = (
  ui: ReactElement,
  { mocks = [], ...options }: Options = {},
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
      <MockedProvider mocks={[...mocks]}>
        <ThemeProvider>{children}</ThemeProvider>
      </MockedProvider>
    </SafeAreaProvider>
  );

  return rntlRender(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react-native";
export { renderWithProviders as render };
