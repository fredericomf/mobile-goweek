import React from 'react';
import * as Expo from 'expo';

import Routes from './routes';

class index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Routes />
        );
    }
}

Expo.registerRootComponent(index);