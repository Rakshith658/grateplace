import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import colors from "../constant/colors";
import * as ImagePicker from "expo-image-picker";
// import * as Permission from "expo-permissions";

const IMPicker = ({ imageTaken }) => {
  //   const vrifipermission = async () => {
  //     const result = await Permission.askAsync(
  //       Permission.CAMERA_ROLL,
  //       Permission.CAMERA
  //     );
  //     if (result.status !== "granted") {
  //       Alert.alert(
  //         "Permission error",
  //         "you need to allow this app to access the camera",
  //         [{ text: "Okay" }]
  //       );
  //       return false;
  //     }
  //     return true;
  //   };

  const [ImageUri, setImageUri] = useState(null);

  const takeImage = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImageUri(image);
    imageTaken(image.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        {!ImageUri ? (
          <Text>No image is selected</Text>
        ) : (
          <Image style={styles.previewImage} source={{ uri: ImageUri.uri }} />
        )}
      </View>
      <Button title="Take Image" onPress={takeImage} color={colors.primary} />
    </View>
  );
};

export default IMPicker;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
  },
  previewContainer: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});
