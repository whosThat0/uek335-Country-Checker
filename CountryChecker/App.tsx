import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Registration from './src/pages/Registration';

import Account from './src/pages/Account';
import Countries from './src/pages/Countries';
import CountryDetails from './src/pages/CountryDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Countries" component={Countries} />
        <Stack.Screen name="CountryDetails" component={CountryDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
