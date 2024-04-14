import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./src/screens/Home.Screen";
import { MusicScreen } from "./src/screens/Music.Screen";
import { FavoriteScreen } from "./src/screens/Favorite.Screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./src/theme/colors";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarStyle: {
    backgroundColor: colors.dark,
  },
};

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MusicScreen"
        component={MusicScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Music"
            component={MusicScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
