import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { HomeScreen } from "./src/screens/Home.Screen";
import { colors } from "./src/theme/colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MusicScreen } from "./src/screens/Music.Screen";
import { FavoriteScreen } from "./src/screens/Favorite.Screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"), // 400
    "Nunito-Bold": require("./assets/fonts/Nunito-SemiBold.ttf"), // 600
  });

  const onLayoutRootView = async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Music" component={MusicScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
      </Stack.Navigator>  
    </NavigationContainer>
  );
}