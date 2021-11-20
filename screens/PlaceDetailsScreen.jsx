import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const PlaceDetailsScreen = ({ route, navigation }) => {
  const { placeid, placetitle } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: placetitle,
    });
  }, [navigation]);
  console.log(placeid, placetitle);
  return (
    <View>
      <Text>PlaceDetailsScreen</Text>
    </View>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({});
