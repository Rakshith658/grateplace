import places from "../Models/Places";
import { ADD_PLACE } from "./Action";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new places(
        Date.now(),
        action.placeData.title,
        action.placeData.image
      );
      return {
        ...state,
        places: [...state.places, newPlace],
      };
    default:
      return state;
  }
};
