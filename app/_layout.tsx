import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ExpenseProvider, useExpense } from "../context/ExpenseContext";

import "../global.css";
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const router = useRouter();
  const { hasCompletedOnboarding, isLoading } = useExpense();

  useEffect(() => {
    if (!isLoading && hasCompletedOnboarding === true) {
      router.replace('/(tabs)');
    }
  }, [isLoading, hasCompletedOnboarding, router]);

  if (isLoading || hasCompletedOnboarding === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#52c1b7' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)"/>
        <Stack.Screen name="(tabs)"/>
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const [fontloaded] = useFonts({
    "Syne-Regular": require("../assets/fonts/Syne-Regular.ttf"),
    "Syne-Medium": require("../assets/fonts/Syne-Medium.ttf"),
    "Syne-SemiBold": require("../assets/fonts/Syne-SemiBold.ttf"),
    "Syne-Bold": require("../assets/fonts/Syne-Bold.ttf"),
    "Syne-ExtraBold": require("../assets/fonts/Syne-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontloaded) SplashScreen.hideAsync();
  }, [fontloaded]);

  return (
    <ExpenseProvider>
      <RootLayoutNav />
    </ExpenseProvider>
  );
}
