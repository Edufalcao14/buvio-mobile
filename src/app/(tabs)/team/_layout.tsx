import React from "react";
import { StyleSheet } from "react-native";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "expo-router/js-top-tabs";
import { withLayoutContext } from "expo-router";
import {
  ParamListBase,
  TabNavigationState,
} from "expo-router/react-navigation";
import Header from "@/components/navigation/header/header";
import { useTheme } from "@/providers/ThemeProvider";
import { t } from "@/i18n";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TeamLayout() {
  const theme = useTheme();

  return (
    <>
      <Header showClubStripe={false} showTeamActions />
      <MaterialTopTabs
        initialRouteName="index"
        screenOptions={{
          // Flat on the ground; a gold underline marks the active tab. The
          // indicator is a fixed 2pt, never a percentage: a "100%" indicator
          // measures the whole bar *including* padding and spills past the
          // labels — the bug this replaces.
          tabBarStyle: {
            backgroundColor: theme.colors.background.default,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.grey.border,
          },
          tabBarIndicatorStyle: {
            height: 2,
            borderRadius: 1,
            backgroundColor: theme.colors.secondary.main,
          },
          tabBarIndicatorContainerStyle: {
            marginBottom: 0,
          },
          tabBarItemStyle: {
            minHeight: 48,
            paddingVertical: 0,
          },
          tabBarActiveTintColor: theme.colors.text.primary,
          tabBarInactiveTintColor: theme.colors.text.secondary,
          tabBarLabelStyle: {
            fontFamily: theme.typography.fontFamily.displayBold,
            fontSize: 15,
            letterSpacing: theme.typography.letterSpacing.normal,
            textTransform: "none",
          },
          tabBarPressColor: "transparent",
        }}
      >
        <MaterialTopTabs.Screen
          name="match"
          options={{ title: t("tabs.matches") }}
        />
        <MaterialTopTabs.Screen
          name="index"
          options={{ title: t("tabs.history") }}
        />
        <MaterialTopTabs.Screen
          name="ranking"
          options={{ title: t("tabs.ranking") }}
        />
      </MaterialTopTabs>
    </>
  );
}
