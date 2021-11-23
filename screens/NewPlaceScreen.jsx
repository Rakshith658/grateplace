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
import LocationPicker from "../components/LocationPicker";
import colors from "../constant/colors";
import { addPlace } from "../store/Action";

const NewPlaceScreen = ({ navigation, route }) => {
  const [Titlevalue, setTitlevalue] = useState("");
  const [imageUri, setimageUri] = useState("");
  const [location, setlocation] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add place",
    });
  }, [navigation]);
  const dispatch = useDispatch();

  const Savehandler = () => {
    dispatch(addPlace(Titlevalue, imageUri, location));
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
        <LocationPicker
          navigation={navigation}
          route={route}
          onLocationPicked={(location) => setlocation(location)}
        />
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
