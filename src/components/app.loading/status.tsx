import React, {useEffect} from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {StatusBar} from 'react-native';

interface StatusProps {
  color: string;
  black: string;
}

export const Status: React.FC<StatusProps> = ({color, black}) => {
  useEffect(() => {
    changeNavigationBarColor(color, true, true);
    return () => changeNavigationBarColor(black, true, true);
  }, []);

  return <StatusBar backgroundColor={color} />;
};
