## Dependências usadas para React Native

### Instalar o React Native

$ sudo yarn global add react-native-cli

-----

### Para iniciar um novo projeto React Native:

$ react-native init [nome-do-projeto]

### Para rodar o projeto em Android:

$ react-native run-android

>> Um caminho mais rápido seria utilizar o 'create-react-native-app'. Ele já cria com o EXPO, facilitando muito a vida na hora de testar em ANDROID e IOS.


### Para implementar as rotas

$ yarn add react-navigation

### Adicionar a biblioteca de ícones para React Native

$ yarn add react-native-vector-icons

É necessário linkar essa biblioteca a aplicação (Se você não estiver utilizando o EXPO)

$ react-native link react-native-vector-icons

### Instalar a dependência AXIOS (para requisições HTTP)

$ yarn add axios

### Instalar a dependência para trabalhar com REALTIME application

$ yarn add socket.io-cli