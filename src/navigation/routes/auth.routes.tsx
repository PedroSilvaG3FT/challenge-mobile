import React from "react";
import Login from "../../screens/Login";
import LoginAccessCode from "../../screens/LoginAccessCode";

import { createStackNavigator } from "@react-navigation/stack";
import EmailMemberRegister from "../../screens/MemberRegister";
import NameMemberRegister from "../../screens/MemberRegister/nameMemberRegister";
import DataMemberRegister from "../../screens/MemberRegister/dataMemberRegister";
import Terms from "../../screens/Terms";
import PasswordMemberRegister from "../../screens/MemberRegister/passwordMemberRegister";

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="LoginAccessCode" component={LoginAccessCode} />
    <AuthStack.Screen name="EmailMemberRegister" component={EmailMemberRegister} />
    <AuthStack.Screen name="PasswordMemberRegister" component={PasswordMemberRegister} />
    <AuthStack.Screen name="NameMemberRegister" component={NameMemberRegister} />
    <AuthStack.Screen name="DataMemberRegister" component={DataMemberRegister} />
    <AuthStack.Screen name="Terms" component={Terms} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
