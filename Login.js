import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
var AuthService = require('./AuthService');

export default class Login extends Component {

    static navigationOptions = {
        title: 'Login',
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: undefined,
            password: undefined,
            showProgress: false
        }
    }

    styles = StyleSheet.create({
        error: {
            color: "red"
        },
        container: {
            backgroundColor: '#F5FCFF',
            flex: 1,
            paddingTop: 40,
            padding: 10,
            alignItems: "center"
        },
        logo: {
            height: 54,
            width: 66
        },
        heading: {
            fontSize: 30,
            marginTop: 20
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
        loader: {
            marginTop: 20
        }
    });

    componentDidMount() {
        AuthService.getAuthInfo((err, authInfo) => {
            this.setState({
                checkingAuth: false,
                isLoggedIn: authInfo != undefined
            });
            if (authInfo) {
                this.props.navigation.navigate('Feed')
            }
        });
    }

    onUserNameChanged = (txt) => {
        this.setState({
            userName: txt
        })
    }

    onPasswordChanged = (txt) => {
        this.setState({
            password: txt
        })
    }

    onLoginPressed = () => {
        this.setState({
            showProgress: true
        });
        var authService = require('./AuthService');
        authService.login({
            userName: this.state.userName,
            password: this.state.password
        }, (results) => {
            this.setState(Object.assign({ showProgress: false }, results));
            if (results.success) {
                this.props.navigation.navigate('Feed');
            }
        })
    }

    render() {
        var errorCtrl = <View />
        if (!this.state.success && this.state.badCredentials) {
            errorCtrl = <Text style={this.styles.error}>That username and password combination did not work</Text>
        }
        if (!this.state.success && this.state.unknownError) {
            errorCtrl = <Text style={this.styles.error}>That username and password combination did not work</Text>
        }
        return (
            <View style={this.styles.container}>
                <Image source={require('./images/logo.png')} style={this.styles.logo} />
                <Text style={this.styles.heading}>Github Browser</Text>
                <TextInput onChangeText={this.onUserNameChanged} autoCapitalize="none" placeholder="Github username" style={this.styles.input} />
                <TextInput onChangeText={this.onPasswordChanged} secureTextEntry={true} placeholder="Github password" style={this.styles.input} />
                <TouchableHighlight style={this.styles.button} onPress={this.onLoginPressed}>
                    <Text style={this.styles.buttonText}>Log in</Text>
                </TouchableHighlight>
                {errorCtrl}
                <ActivityIndicator size="large" animating={this.state.showProgress} style={this.styles.loader} />
            </View>
        );
    }
}