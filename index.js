/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';
import {registerCustomIconType} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import store from './src/store';
import { Provider } from 'react-redux';

const MainComponent = () => {
    return (
            <Provider store={store}>
                <App />
            </Provider>
    )
}

AppRegistry.registerComponent(appName, () => MainComponent);
registerCustomIconType('font-awesome-5', FontAwesome5);
