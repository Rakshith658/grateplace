import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";
import NewPlaceScreen from "./screens/NewPlaceScreen";
import PlaceDetailsScreen from "./screens/PlaceDetailsScreen";
import PlaceListScreen from "./screens/PlaceListScreen";
import colors from "./constant/colors";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider, useDispatch } from "react-redux";
import ReduxThunk from "redux-thunk";
import Reducers from "./store/Reducers";
import { init } from "./helpers/db";
import { fetchdata } from "./store/Action";

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  places: Reducers,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

init()
  .then(() => console.log("initializing db is successful"))
  .catch((error) => console.log(error));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen name="PlaceListScreen" component={PlaceListScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="NewPlaceScreen" component={NewPlaceScreen} />
          <Stack.Screen
            name="PlaceDetailsScreen"
            component={PlaceDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
