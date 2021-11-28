import React, { useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MapPriView from "../components/MapPriView";
import colors from "../constant/colors";

const PlaceDetailsScreen = ({ route, navigation }) => {
  const { placeid, placetitle } = route.params;
  const selectedplace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeid)
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: placetitle,
    });
  }, [navigation]);
  return (
    <ScrollView style={{ flex: 1 }}>
      <Image source={{ uri: selectedplace.imageUri }} style={styles.image} />
      <View style={{ alignItems: "center" }}>
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{selectedplace.address}</Text>
          </View>
          <MapPriView
            style={styles.mapPreview}
            location={{ lat: selectedplace.lat, lng: selectedplace.lng }}
            onPress={() =>
              navigation.navigate("MapScreen", {
                location: { lat: selectedplace.lat, lng: selectedplace.lng },
                details: true,
              })
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
