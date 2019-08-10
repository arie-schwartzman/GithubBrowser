import React, { Component } from 'react';
import { ActivityIndicator, Text, View, FlatList, Image, TouchableHighlight } from 'react-native';


export default class Search extends Component {

    static navigationOptions = {
        title: 'Search'
    }

    render() {
        return (
            <View>
                <Text>Search!</Text>
            </View>
        )
    }
}