import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { ExpenseProvider } from './src/context/ExpenseContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SplashScreen } from "expo-router";
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontloaded] = useFonts({
    "Syne-Regular": require("./assets/fonts/Syne-Regular.ttf"),
    "Syne-Medium": require("./assets/fonts/Syne-Medium.ttf"),
    "Syne-SemiBold": require("./assets/fonts/Syne-SemiBold.ttf"),
    "Syne-Bold": require("./assets/fonts/Syne-Bold.ttf"),
    "Syne-ExtraBold": require("./assets/fonts/Syne-ExtraBold.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (fontloaded) {
      setTimeout(() => {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [fontloaded]);

  if (!fontloaded || isLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <ExpenseProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ExpenseProvider>
    </GestureHandlerRootView>
  );
}