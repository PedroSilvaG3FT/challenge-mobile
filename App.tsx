import 'react-native-gesture-handler';
import React from 'react';

import Navigation from './src/navigation';
import useColorScheme from './src/hooks/useColorScheme';
import useCachedResources from './src/hooks/useCachedResources';

import { StatusBar } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
          translucent
        />
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}
