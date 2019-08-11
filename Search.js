import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Image, TouchableHighlight, TextInput, StyleSheet } from 'react-native';


export default class Search extends Component {

    constructor(props) {
        super(props);
        state = {

        }
    }

    static navigationOptions = {
        title: 'Search'
    }

    onSearchChanged = (text) => {
        this.setState({
            searchQuery: text
        })
    }

    onSearchPressed = () => {
        this.props.navigation.navigate('SearchResults', { searchQuery: this.state.searchQuery });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} onChangeText={this.onSearchChanged} autoCapitalize="none" placeholder="Search Query" />
                <TouchableHighlight style={styles.button} onPress={this.onSearchPressed}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
        alignSelf: 'stretch'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
})