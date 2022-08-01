import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Colors} from '@styles';
import {AppNavGradient} from './gradient';

export const AppNavOptions: NativeStackNavigationOptions = {
  headerBackground: AppNavGradient,
  headerTitleStyle: {color: Colors.WHITE},
  headerTintColor: Colors.WHITE,
};

export const AuthWelScrnOpts: NativeStackNavigationOptions = {
  headerShown: false,
  headerBackground: undefined,
};
