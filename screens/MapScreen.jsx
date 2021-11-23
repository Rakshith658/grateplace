import React, { useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomheaderButton";

const MapScreen = ({ navigation }) => {
  const [selectedLocation, setselectedLocation] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Map Screen",
      headerRight: () =>
        selectedLocation && (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Save location"
              iconName="save-outline"
              onPress={savePickedLocation}
            />
          </HeaderButtons>
        ),
    });
  }, [navigation, selectedLocation]);
  const savePickedLocation = () => {
    navigation.navigate("NewPlaceScreen", {
      pickedLocation: selectedLocation,
    });
  };
  const region = {
    latitude: 13.0984902,
    longitude: 77.5950736,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
  return (
    <MapView
      initialRegion={region}
      style={styles.mapContainer}
      onPress={SelectLocationHandler}
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
