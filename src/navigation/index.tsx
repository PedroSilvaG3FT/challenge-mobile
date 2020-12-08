import * as React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { ColorSchemeName } from "react-native";
import LinkingConfiguration from "./LinkingConfiguration";
import Routes from "./routes";
import {AuthProvider} from "../contexts/auth";

export default function Navigation({ colorScheme, }: { colorScheme: ColorSchemeName; }) {
  let theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  theme = DefaultTheme;

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
