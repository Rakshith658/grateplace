import * as FileSystem from "expo-file-system";
import { fetchplace, insertData } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const FilePath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: FilePath,
      });
      const dbResult = await insertData(
        title,
        FilePath,
        "dummy address",
        15.6,
        16.5
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: FilePath,
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
