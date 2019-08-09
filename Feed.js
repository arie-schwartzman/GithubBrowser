import React, { Component } from 'react';
import { ActivityIndicator, Text, View, FlatList } from 'react-native';
export default class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    renderItem = (rowData) => {
        if (!rowData) {
            return null;
        }
        return (
            <Text style={{ color: '#333' }}>
                {rowData.item.actor.display_login}
            </Text>
        )
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.fetchFeed();
    }

    fetchFeed() {
        require('./AuthService').getAuthInfo((err, authInfo) => {
            var url = 'https://api.github.com/users/'
                + authInfo.user.login
                + '/events'
            fetch(url, {
                headers: authInfo.header
            }).then((response) => {
                return response.json();
            }).then((results) => {
                var feedItems = results.filter((ev) => {
                    return true
                })
                this.setState({
                    data: feedItems
                })
            }).finally(() => {
                this.setState({
                    loading: false
                })
            });
        });
    }

    render() {
        if (this.state.loading) {
            return (<ActivityIndicator style={{ flex: 1, justifyContent: "center", paddingTop: 20 }}
                animating={this.state.loading} size="large" />)
        }
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 40, padding: 10 }}>
                <FlatList data={this.state.data}
                    renderItem={this.renderItem} >
                </FlatList>
            </View>
        );
    }
}