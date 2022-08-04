import {
  MainBulletin,
  MainCalendar,
  MainChat,
  MainMenu,
  MainTasks,
} from '@components';
import {AuthNav} from '@constants';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors} from '@styles';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackScreenProps} from './types';

const Tab = createMaterialTopTabNavigator();

type Props = RootStackScreenProps<'MainTab'>;
export const MainTab: React.FC<Props> = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: Colors.TINT,
        tabBarInactiveTintColor: Colors.GRAY_DARK,
        tabBarPressColor: Colors.GRAY_MEDIUM,
        tabBarItemStyle: {height: 52},
        tabBarLabelStyle: {fontWeight: '600', textTransform: 'capitalize'},
        tabBarContentContainerStyle: {backgroundColor: 'white'},
      }}>
      <Tab.Screen
        key={'Tasks'}
        name={'Tasks'}
        component={MainTasks}
        options={{
          title: AuthNav['Tasks'.toUpperCase()],
          tabBarLabel: AuthNav.TASKS,
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name={'check-circle'.concat(focused ? '' : '-outline')}
              color={color}
              size={AuthNav.defaultIconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        key={'Bulletin'}
        name={'Bulletin'}
        component={MainBulletin}
        options={{
          title: AuthNav['Bulletin'.toUpperCase()],
          tabBarLabel: AuthNav.BULLETIN,
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name={'newspaper-variant'.concat(focused ? '' : '-outline')}
              color={color}
              size={AuthNav.defaultIconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        key={'Chat'}
        name={'Chat'}
        component={MainChat}
        options={{
          title: AuthNav['Chat'.toUpperCase()],
          tabBarLabel: AuthNav.CHAT,
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name={'message'.concat(focused ? '' : '-outline')}
              color={color}
              size={AuthNav.defaultIconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        key={'Calendar'}
        name={'Calendar'}
        component={MainCalendar}
        options={{
          title: AuthNav['Calendar'.toUpperCase()],
          tabBarLabel: AuthNav.CALENDAR,
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name={'calendar'.concat(focused ? '' : '-outline')}
              color={color}
              size={AuthNav.defaultIconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        key={'Menu'}
        name={'Menu'}
        component={MainMenu}
        options={{
          title: AuthNav['Menu'.toUpperCase()],
          tabBarLabel: AuthNav.MENU,
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name={'cog'.concat(focused ? '' : '-outline')}
              color={color}
              size={AuthNav.defaultIconSize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
