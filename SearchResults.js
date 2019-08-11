import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Image, TouchableHighlight, FlatList, StyleSheet } from 'react-native';
import { tsRestType } from '@babel/types';

export default class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            searchQuery: props.navigation.getParam('searchQuery')
        }
    }

    static navigationOptions = {
        title: 'Search Results'
    }

    componentDidMount() {
        this.doSearch();
    }

    doSearch() {
        var url = 'https://api.github.com/search/repositories?q=' +
            encodeURIComponent(this.state.searchQuery);
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                this.setState({
                    data: responseData.items
                })
            })
            .finally(() => {
                this.setState({ loading: false })
            });
    }

    renderItem = (rowData) => {
        return (
            <View style={{
                padding: 20,
                borderColor: '#D7D7D7',
                borderBottomWidth: 1,
                backgroundColor: '#fff'
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: '600'
                }}>
                    {rowData.item.full_name}
                </Text>
                <View style={
                    {
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 20,
                        paddingBottom: 20
                    }}>
                    <View style={styles.repoCell}>
                        <Image style={styles.repoCellIcon} source={require('./images/star.png')} />
                        <Text style={styles.repoCellLabel}>
                            {rowData.item.stargazers_count}
                        </Text>
                    </View>
                </View>

            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator animating={this.state.loading} size="large" />
                <FlatList data={this.state.data} renderItem={this.renderItem} />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    repoCell: {
        width: 50,
        alignItems: 'center'
    },
    repoCellIcon: {
        width: 20,
        height: 20
    },
    repoCellLabel: {
        textAlign: 'center'
    }
});
