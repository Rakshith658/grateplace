import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomheaderButton";
import * as Location from "expo-location";

const MapScreen = ({ route, navigation }) => {
  // const { details, location } = route.params;
  const [selectedLocation, setselectedLocation] = useState();
  const [reginLocation, setreginLocation] = useState({});
  const [IsFetching, setIsFetching] = useState(true);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Map Screen",
      headerRight: () => {
        if (route.params?.details == true) {
          return;
        } else {
          if (selectedLocation) {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Save location"
                  iconName="save-outline"
                  onPress={savePickedLocation}
                />
              </HeaderButtons>
            );
          }
        }
      },
    });
  }, [navigation, selectedLocation]);
  const savePickedLocation = () => {
    navigation.navigate("NewPlaceScreen", {
      pickedLocation: selectedLocation,
    });
  };
  const SelectLocationHandler = (event) => {
    setselectedLocation(event.nativeEvent.coordinate);
  };

  let markerLocation;
  if (selectedLocation) {
    markerLocation = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }

  if (route.params?.details == true) {
    markerLocation = {
      latitude: route.params?.location.lat,
      longitude: route.params?.location.lng,
    };
  }

  const oklocation = async () => {
    setIsFetching(true);
    if (route.params?.details == true) {
      await setreginLocation({
        latitude: route.params?.location.lat,
        longitude: route.params?.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      await TakeUserLocation();
    }
    setIsFetching(false);
  };
  useEffect(() => {
    oklocation();
  }, []);
  const TakeUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission to access location was denied",
        "Please allow the app to access location",
        [{ text: "Okay" }]
      );
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({
        timeInterval: 5000,
      });
      await setreginLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      Alert.alert(
        "should not able to access location",
        "Please try again or Pick the location from Map",
        [{ text: "Okay" }]
      );
    }
  };
  if (IsFetching) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <MapView
      initialRegion={reginLocation}
      style={styles.mapContainer}
      onPress={route.params?.details == true ? null : SelectLocationHandler}
    >
      {markerLocation && (
        <Marker title="Picked Location" coordinate={markerLocation}></Marker>
      )}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
  },
});
