import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../constant/colors";
import * as Location from "expo-location";
import MapPriView from "./MapPriView";

const LocationPicker = ({ navigation, route, onLocationPicked }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [selectedLocation, setselectedLocation] = useState(null);

  const pickedLocation = route.params?.pickedLocation;

  useEffect(() => {
    if (pickedLocation) {
      setselectedLocation({
        lat: pickedLocation.latitude,
        lng: pickedLocation.longitude,
      });
      onLocationPicked({
        lat: pickedLocation.latitude,
        lng: pickedLocation.longitude,
      });
    }
  }, [pickedLocation]);
  const TakeUserLocation = async () => {
    setIsFetching(true);
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
      await setselectedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "should not able to access location",
        "Please try again or Pick the location from Map",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const PickonMapLocation = () => {
    navigation.navigate("MapScreen");
  };
  return (
    <View style={styles.container}>
      <MapPriView
        style={styles.previewContainer}
        location={selectedLocation}
        onPress={PickonMapLocation}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Text>No Location showed yet</Text>
        )}
      </MapPriView>
      <View style={styles.buttonContainer}>
        <Button
          title="Take Location"
          color={colors.primary}
          onPress={TakeUserLocation}
        />
        <Button
          title="Pick on Map"
          color={colors.primary}
          onPress={PickonMapLocation}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
  },
  previewContainer: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
