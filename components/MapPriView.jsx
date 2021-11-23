import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import vars from "../env";

const MapPriView = (props) => {
  let imagePriviewUrl;
  if (props.location) {
    imagePriviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${vars.GOOGLE_MAP_API}`;
  }
  return (
    <TouchableOpacity
      style={{ ...props.style, ...styles.mappriView }}
      onPress={props.onPress}
    >
      {props.location ? (
        <Image style={styles.mapimage} source={{ uri: imagePriviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

export default MapPriView;

const styles = StyleSheet.create({
  mappriView: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapimage: {
    width: "100%",
    height: "100%",
  },
});
