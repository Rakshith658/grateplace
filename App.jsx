import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";
import NewPlaceScreen from "./screens/NewPlaceScreen";
import PlaceDetailsScreen from "./screens/PlaceDetailsScreen";
import PlaceListScreen from "./screens/PlaceListScreen";
import colors from "./constant/colors";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:colors.primary},headerTintColor:"white"}}>
        <Stack.Screen name="PlaceListScreen" component={PlaceListScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="NewPlaceScreen" component={NewPlaceScreen} />
        <Stack.Screen name="PlaceDetailsScreen" component={PlaceDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
