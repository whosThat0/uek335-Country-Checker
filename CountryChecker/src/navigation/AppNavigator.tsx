import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import RegistrationScreen from '../screens/Registration';
import AppBar from '../components/AppBar';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Countries from '../screens/Countries';
import CountryDetails from '../screens/CountryDetails';

const Stack = createNativeStackNavigator();
export default function AppNavigator({ isLoggedIn, setIsLoggedIn }) {
  return (
    <>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Registration">
  {props => <RegistrationScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
</Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Account} />
            <Stack.Screen name="Countries" component={Countries} />
            <Stack.Screen name="CountryDetails" component={CountryDetails} />
          </>
        )}
      </Stack.Navigator>

      {isLoggedIn && <AppBar />}
    </>
  );
}