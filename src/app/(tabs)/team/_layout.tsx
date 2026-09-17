import React from "react";
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
          // Segmented pills on the green chrome: the active tab is a filled
          // bubble rather than an underline, matching the world's geometry.
          tabBarStyle: {
            backgroundColor: theme.colors.primary.main,
            elevation: 0,
            shadowOpacity: 0,
            paddingHorizontal: theme.spacing.md,
            paddingBottom: theme.spacing.sm,
          },
          tabBarIndicatorStyle: {
            height: "100%",
            borderRadius: theme.borderRadius.round,
            backgroundColor: "rgba(249, 249, 249, 0.16)",
          },
          tabBarIndicatorContainerStyle: {
            marginBottom: 0,
          },
          tabBarItemStyle: {
            paddingVertical: theme.spacing.xs,
            minHeight: 44,
          },
          tabBarActiveTintColor: theme.colors.primary.contrastText,
          tabBarInactiveTintColor: "rgba(249, 249, 249, 0.6)",
          tabBarLabelStyle: {
            fontFamily: theme.typography.fontFamily.displayBold,
            fontSize: theme.typography.fontSize.sm,
            textTransform: "none",
          },
          tabBarPressColor: "transparent",
        }}
      >
        <MaterialTopTabs.Screen name="match" options={{ title: "Matchs" }} />
        <MaterialTopTabs.Screen
          name="index"
          options={{ title: "Historique" }}
        />
        <MaterialTopTabs.Screen
          name="ranking"
          options={{ title: "Classement" }}
        />
      </MaterialTopTabs>
    </>
  );
}
