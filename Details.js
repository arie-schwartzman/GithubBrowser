import React, { Component } from 'react';
import { ActivityIndicator, Text, View, FlatList, Image, TouchableHighlight, StyleSheet } from 'react-native';
const moment = require('moment');

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static navigationOptions = {
        title: 'Details'
    }

    componentDidMount() {
        this.setState({
            pushEvent: this.props.navigation.getParam('rowData').item
        })
    }

    renderItem = (rowData) => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1,
                borderTopWidth: 1,
                paddingBottom: 20,
                paddingTop: 20,
                padding: 10
            }}>
                <Text><Text style={styles.bold}>{rowData.item.sha.substring(0, 6)}</Text>-{rowData.item.message}</Text>
            </View >
        )
    }

    render() {
        if (!this.state.pushEvent) {
            return null;
        }
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10 }}>
                <Image style={{ height: 120, width: 120, borderRadius: 60 }} source={{
                    url: this.state.pushEvent.actor.avatar_url
                }} />
                <Text style={{
                    fontSize: 20,
                    paddingTop: 10
                }}>
                    {moment(this.state.pushEvent.created_at).fromNow()}
                </Text>
                <Text style={styles.bold}>
                    {this.state.pushEvent.actor.login}
                </Text>
                <Text style={styles.bold}>
                    {this.state.pushEvent.payload.ref}
                </Text>
                <Text style={styles.bold}>
                    {this.state.pushEvent.repo.name}
                </Text>
                <Text style={{ fontSize: 20, paddingTop: 10 }}>
                    {this.state.pushEvent.payload.commits.length} Commits
                </Text>

                <FlatList style={{ paddingTop: 20 }} data={this.state.pushEvent.payload.commits} renderItem={this.renderItem} >

                </FlatList>
            </View>
        )
    }
}

styles = StyleSheet.create({
    bold: {
        fontSize: 16,
        fontWeight: "800"
    }
})
