import React from 'react';
import {
    FlatList, // NOTA_ESTUDO: Melhor desempenho para mobile
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import socket from 'socket.io-client';
import Tweet from '../components/Tweet';

import api from '../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

class Timeline extends React.Component {

    state = {
        tweets: [],
    }

    static navigationOptions = ({navigation}) => ({ // NOTA_ESTUDO: Com parêntesis o retorno é um objeto
        title: "Início",
        headerRight: (

            <TouchableOpacity onPress={() => { navigation.navigate('New') }} >
                <Icon
                    name="add-circle-outline"
                    size={24}
                    color="#4BB0EE"
                    style={{ marginRight: 20 }}
                />
            </TouchableOpacity>
        )
    });


    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.subscribeToEvents();

        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
    }

    subscribeToEvents = () => {
        const io = socket('http://192.168.0.37:3000');

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] });
        });

        io.on('like', data => { 
            this.setState({
                tweets: this.state.tweets.map(tweet => {
                    return tweet._id === data._id ? data : tweet;
                })
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={({item}) => <Tweet tweet={item} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});

export default Timeline;