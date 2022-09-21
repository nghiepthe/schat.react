/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Main} from './src';
import {name as appName} from './app.json';
import 'react-native-get-random-values';

AppRegistry.registerComponent(appName, () => Main);
