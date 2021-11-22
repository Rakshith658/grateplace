import places from "../Models/Places";
import { ADD_PLACE, SET_PLACE } from "./Action";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new places(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image
      );
      return {
        ...state,
        places: [...state.places, newPlace],
      };
    case SET_PLACE:
      return {
        ...state,
        places: action.placeData.map(
          (place) =>
            new places(place.id.toString(), place.title, place.imageUri)
        ),
      };
    default:
      return state;
  }
};
