import React, { Component } from 'react';
import { ActivityIndicator, Text, View, FlatList, Image, TouchableHighlight } from 'react-native';

var moment = require('moment');

export default class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    static navigationOptions = {
        title: 'Feed'
    };

    pressRow = (rowData) => {
        console.log(rowData);
        this.props.navigation.navigate('Details', { rowData });
    }

    renderItem = (rowData) => {
        if (!rowData) {
            return null;
        }
        return (
            <TouchableHighlight onPress={() => { this.pressRow(rowData) }}
                underlayColor="#ddd" >

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1
                }}>
                    <Image style={{ height: 36, width: 36, borderRadius: 18 }}
                        source={{ url: rowData.item.actor.avatar_url }} />
                    <View style={{ paddingLeft: 20 }}>
                        <Text style={{ backgroundColor: '#fff' }}>
                            {moment(rowData.item.created_at).fromNow()}
                        </Text>
                        <Text style={{ backgroundColor: '#fff' }}>
                            {rowData.item.actor.login} pushed to
                    </Text>
                        <Text style={{ backgroundColor: '#fff' }}>
                            {rowData.item.payload.ref}
                        </Text>
                        <Text style={{ backgroundColor: '#fff' }}>
                            {rowData.item.repo.name}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight >
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
            <View style={{ flex: 1, justifyContent: 'flex-start', padding: 10 }}>
                <FlatList data={this.state.data}
                    renderItem={this.renderItem} >
                </FlatList>
            </View>
        );
    }
}
