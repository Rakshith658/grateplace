import React, { useLayoutEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import IMPicker from "../components/ImagePicker";
import colors from "../constant/colors";
import { addPlace } from "../store/Action";

const NewPlaceScreen = ({ navigation }) => {
  const [Titlevalue, setTitlevalue] = useState("");
  const [imageUri, setimageUri] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add place",
    });
  }, [navigation]);
  const dispatch = useDispatch();

  const Savehandler = () => {
    dispatch(addPlace(Titlevalue, imageUri));
    setimageUri("");
    setTitlevalue("");
    navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.Title}>Title</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter the title"
          value={Titlevalue}
          onChangeText={(e) => setTitlevalue(e)}
        />
        <IMPicker imageTaken={(image) => setimageUri(image)} />
        <Button title="Save" color={colors.primary} onPress={Savehandler} />
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  formContainer: {
    margin: "5%",
  },
  Title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  TextInput: {
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 10,
    fontSize: 14,
  },
});
