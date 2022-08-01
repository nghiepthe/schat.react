import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';

export type MainTabParamList = {
  MainTask: undefined;
  MainBulletin: undefined;
  MainChat: undefined;
  MainCalendar: undefined;
  MainMenu: undefined;
};

export type RootStackParamList = {
  MainTab: NavigatorScreenParams<MainTabParamList>;
  AuthWelcome: undefined;
  AuthSignup: undefined;
  AuthSignin: undefined;
  AuthSignupSuccess: {
    fullName: string;
    address: string;
    mnemonic: string;
    privateKey: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    MaterialBottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
