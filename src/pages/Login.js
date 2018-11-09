import React from 'react';
import {
    AsyncStorage, // É como se fosse o LocalStore para React DOM (LocalStore armazena no BD do Browser)
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

class Login extends React.Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        username: '',
    }

    constructor(props) {
        super(props);
    }

    /**
     * NOTA_ESTUDO:
     * 
     * Abaixo implementamos a consulta ao banco de dados local (segundo o curso, é o SQLite, mas preciso investigar isso).
     * 
     * Se o usuário já estava logado vai direto para a Timeline.
     * 
     */
    async componentDidMount() {
        const username = await AsyncStorage.getItem('@GoTwitter:username');

        if (username) {
            this.navigateToTimeLine();
        }
    }

    handleInputChange = username => {
        this.setState({ username });
    }

    /**
     * NOTA_ESTUDO:
     * Esse método serve para evitar que ao navegar pela rota Timeline
     * o botão de voltar apareça na barra do topo da aplicação.
     * 
     * Basicamente, abaixo, o método reseta todo o histórico de navegação
     */
    navigateToTimeLine = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Timeline' })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    handleLogin = async () => {

        const { username } = this.state;

        if (!username.length) return;

        await AsyncStorage.setItem('@GoTwitter:username', username);

        this.navigateToTimeLine();

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.content}>

                    {/* NOTA_ESTUDO: Essa view envolvendo o Icon serve para evitar a má renderização da animação do KeyboardAvoidingView */}
                    <View>
                        <Icon name="twitter" size={64} color="#4BB0EE" />
                    </View>

                    <TextInput style={styles.input}
                        placeholder="Nome de usuário"
                        value={this.state.username}
                        onChangeText={this.handleInputChange}

                        // NOTA_ESTUDO: As opções abaixo servem para submeter o login caso o usuário clique no botão "ENTER" (grosseiramente falando)
                        returnKeyType="send"
                        onSubmitEditing={this.handleLogin}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 15,
        alignSelf: "stretch",
        marginTop: 30
    },

    button: {
        height: 44,
        alignSelf: "stretch",
        marginTop: 10,
        backgroundColor: "#4BB0EE",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default Login;