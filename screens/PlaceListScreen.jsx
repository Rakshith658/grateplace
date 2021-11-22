import React, { useEffect, useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../components/CustomheaderButton";
import PlaceItem from "../components/PlaceItem";
import { fetchdata } from "../store/Action";

const PlaceListScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "All place",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add Place"
            iconName="md-add"
            onPress={() => navigation.navigate("NewPlaceScreen")}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchdata());
  }, [dispatch]);
  return (
    <FlatList
      data={places}
      keyExtractor={(Item) => Item.id.toString()}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          image={itemData.item.imageUri}
          address={itemData.item.address}
          onSelect={() =>
            navigation.navigate("PlaceDetailsScreen", {
              placeid: itemData.item.id,
              placetitle: itemData.item.title,
            })
          }
        />
      )}
    />
  );
};

export default PlaceListScreen;
