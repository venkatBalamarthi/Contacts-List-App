import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import ROUTER_NAMES from './RouterConstants';
const Stack = createNativeStackNavigator();

const SCREEN_OPTIONS = {
  headerShown: false,
};

const AppRouter = ({initialRouteName = ''}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={SCREEN_OPTIONS}>
        {ROUTER_NAMES.map(route => {
          return (
            <Stack.Screen
              key={route.key}
              name={route.name}
              component={route.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;