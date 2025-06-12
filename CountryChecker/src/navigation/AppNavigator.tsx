import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from '../screens/Login';
import RegistrationScreen from '../screens/Registration';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Countries from '../screens/Countries';
import CountryDetails from '../screens/CountryDetails';
import CountryEdit from '../screens/CountryEdit';
import CountryAdd from '../screens/CountryAdd';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Countries') iconName = 'flag';
          if (route.name === 'Profile') iconName = 'account';
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
        headerShown: false,
        tabBarStyle: {
          height: 90,
          backgroundColor: '#c8c2d0',
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: '#4a4a4a', 
        tabBarInactiveTintColor: '#fff'
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Countries" component={Countries} />
      <Tab.Screen name="Profile">
        {props => <Account {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
          <Stack.Screen name="MainTabs">
            {props => <MainTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="CountryDetails" component={CountryDetails} />
          <Stack.Screen name="CountryEdit" component={CountryEdit} />
            <Stack.Screen name="CountryAdd" component={CountryAdd} />
        </>
      )}
    </Stack.Navigator>
  );
}