import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import CustomHeaderButton from "../components/CustomheaderButton";
import PlaceItem from "../components/PlaceItem";

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
  return (
    <FlatList
      data={places}
      keyExtractor={(Item) => Item.id.toString()}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          image={itemData.item.image}
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
