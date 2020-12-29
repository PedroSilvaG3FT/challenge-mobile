import React from "react";
import Login from "../../screens/Login";

import { createStackNavigator } from "@react-navigation/stack";
import EmailMemberRegister from "../../screens/MemberRegister";
import NameMemberRegister from "../../screens/MemberRegister/nameMemberRegister";
import DataMemberRegister from "../../screens/MemberRegister/dataMemberRegister";
import Accept from "../../screens/Accept";

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="EmailMemberRegister" component={EmailMemberRegister} />
    <AuthStack.Screen name="NameMemberRegister" component={NameMemberRegister} />
    <AuthStack.Screen name="DataMemberRegister" component={DataMemberRegister} />
    <AuthStack.Screen name="Accept" component={Accept} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
