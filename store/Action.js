import * as FileSystem from "expo-file-system";
import { fetchplace, insertData } from "../helpers/db";
import vars from "../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const FilePath = FileSystem.documentDirectory + fileName;
    const result = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${vars.GOOGLE_MAP_API}`
    );
    if (!result.ok) {
      throw new Error("Something went wrong ! 1");
    }
    const resData = await result.json();

    if (!resData.results) {
      throw new Error("Something went wrong ! 2");
    }
    // const address = resData.result[0].forme
    const Address = resData.results[0].formatted_address;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: FilePath,
      });
      const dbResult = await insertData(
        title,
        FilePath,
        Address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: FilePath,
          address: Address,
          lat: location.lat,
          lngs: location.lng,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchdata = () => {
  return async (dispatch) => {
    try {
      const result = await fetchplace();
      dispatch({
        type: SET_PLACE,
        placeData: result.rows._array,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
