import { useCallback } from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, FONT } from "../constants/theme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    PromptRegular: require("../assets/fonts/Prompt-Regular.ttf"),
    PromptBold: require("../assets/fonts/Prompt-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Tabs
        screenOptions={{
          // unmountOnBlur: true,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.lightWhite,
          headerTitleStyle: {
            fontFamily: FONT.bold,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            tabBarLabel: "Camera",
            title: "Camera",
            tabBarIcon: ({ color }) => (
              <Ionicons name="camera" size={32} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
