import React from 'react';
import { AsyncStorage, SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

class New extends React.Component {

    state = {
        newTweet: '',
    };

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    };

    goBack = () => {
        this.props.navigation.pop();
     };

    handleNewTweet = async () => { 

        const content = this.state.newTweet;
        const author = await AsyncStorage.getItem('@GoTweeter:username');

        await api.post('tweets', {content, author});

        this.goBack();
    };

    handleInputChange = newTweet => {
        this.setState({ newTweet });
    };


    /**
     * NOTA_ESTUDO:
     * 
     * O safe area view serve para evitar que os componentes fiquem na área NOTCH
     */
    render() {
        return (
            <SafeAreaView style={[styles.container, { marginTop: 20 }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.goBack} >
                        <Icon name="close" size={24} color="#4BB0EE" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleNewTweet}>
                        <Text style={styles.buttonText}>Tweetar</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    multiline
                    placeholder="O que está acontecendo"
                    placeholderTextColor="#999"
                    value={this.state.newTweet}
                    onChangeText={this.handleInputChange}
                    returnKeyType="send"
                    onSubmitEditing={this.handleNewTweet} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    header: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    button: {
        height: 32,
        paddingHorizontal: 20,
        borderRadius: 16,
        backgroundColor: "#4BB0EE",
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },

    input: {
        margin: 20,
        fontSize: 16,
        color: "#333"
    }
});

export default New;