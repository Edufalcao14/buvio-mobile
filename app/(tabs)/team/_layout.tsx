import React from "react";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import Header from "../../../components/navigation/header/header";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TeamLayout() {
  return (
    <>
      <Header />
      <MaterialTopTabs initialRouteName="index">
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
