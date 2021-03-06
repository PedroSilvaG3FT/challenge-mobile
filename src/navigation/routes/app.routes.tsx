import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import BottomTabNavigator from "../BottomTabNavigator";
import NotFoundScreen from "../../screens/NotFoundScreen";

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
            />
        </Stack.Navigator>
    );
}

const AppRoutes: React.FC = () => <RootNavigator />;

export default AppRoutes;
