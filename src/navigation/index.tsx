import * as React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { ColorSchemeName } from "react-native";
import LinkingConfiguration from "./LinkingConfiguration";
import Routes from "./routes";

export default function Navigation({ colorScheme, }: { colorScheme: ColorSchemeName; }) {
  var theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  theme = DefaultTheme;

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
        <Routes />
    </NavigationContainer>
  );
}
