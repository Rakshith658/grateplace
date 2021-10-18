import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomheaderButton';

const PlaceListScreen = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
          title:"All place",
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
    return (
        <View>
            <Text>PlaceListScreen</Text>
        </View>
    )
}

export default PlaceListScreen

const styles = StyleSheet.create({})
