import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NewPlaceScreen = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
          title:"Add place",
        });
      }, [navigation]);
    return (
        <View>
            <Text>NewPlaceScreen</Text>
        </View>
    )
}

export default NewPlaceScreen

const styles = StyleSheet.create({})
