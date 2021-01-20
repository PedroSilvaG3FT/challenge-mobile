import { Feather as Icon } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, TabMemberGroupParamList, TabMemberParamList, TabSettingsParamList, TabTipsNewsParamList } from '../../types';

import Member from '../screens/Member';
import MemberGroup from '../screens/MemberGroup';
import TipsNews from '../screens/TipsNews';
import Settings from '../screens/Settings';
import Menu from '../screens/Menu';
import Exercice from '../screens/Exercice';
import Profile from '../screens/Profile';
import CameraComponent from '../components/Camera';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const sizeIconDefault = 20;

  return (
    <BottomTab.Navigator
      initialRouteName="TabMember"
      tabBarOptions={{ activeTintColor: Colors.colorPrimary }}>
      <BottomTab.Screen
        name="TabMember"
        component={TabMemberNavigator}
        options={{
          tabBarLabel: "Eu",
          tabBarIcon: ({ color }) => (<Icon name="user" size={sizeIconDefault} color={color} />),
        }}
      />
      <BottomTab.Screen
        name="TabMemberGroup"
        component={TabMemberGroupNavigator}
        options={{
          tabBarLabel: "Grupo",
          tabBarIcon: ({ color }) => <Icon name="users" size={sizeIconDefault} color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="TabTipsNews"
        component={TabTipsNewsNavigator}
        options={{
          tabBarLabel: "Dicas/Noticias",
          tabBarIcon: ({ color }) => <Icon name="book-open" size={sizeIconDefault} color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name="TabSettings"
        component={TabSettingsNavigator}
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: ({ color }) => <Icon name="list" size={sizeIconDefault} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabMemberStack = createStackNavigator<TabMemberParamList>();

function TabMemberNavigator() {
  return (
    <TabMemberStack.Navigator>
      <TabMemberStack.Screen
        name="MemberScreen"
        component={Member}
        options={{
          headerShown: false,
        }}
      />

      <TabMemberStack.Screen 
        name="MenuScreen"
        component={Menu}
        options={{
          title: "Cardapio"
        }}
      />

      <TabMemberStack.Screen
        name="ExerciceScreen"
        component={Exercice}
        options={{
          title: "Exercícios"
        }}
      />

      <TabMemberStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          title: "Meu Perfil"
        }}
      />
    </TabMemberStack.Navigator>
  );
}

const TabMemberGroupStack = createStackNavigator<TabMemberGroupParamList>();

function TabMemberGroupNavigator() {
  return (
    <TabMemberGroupStack.Navigator>
      <TabMemberGroupStack.Screen
        name="TabMemberGroupScreen"
        component={MemberGroup}
        options={{ headerTitle: 'Membros' }}
      />
    </TabMemberGroupStack.Navigator>
  );
}

// const TabTipsNewsStack = createStackNavigator<TabTipsNewsParamList>();

// function TabTipsNewsNavigator() {
//   return (
//     <TabTipsNewsStack.Navigator>
//       <TabTipsNewsStack.Screen
//         name="TabTipsNewsScreen"
//         component={TipsNews}
//       />
//     </TabTipsNewsStack.Navigator>
//   )
// }

const TabSettingsStack = createStackNavigator<TabSettingsParamList>();

function TabSettingsNavigator() {
  return (
    <TabSettingsStack.Navigator>
      <TabSettingsStack.Screen
        name="TabSettingsScreen"
        component={Settings}
        options={{ headerShown: false}}
      />
    </TabSettingsStack.Navigator>
  )
}

