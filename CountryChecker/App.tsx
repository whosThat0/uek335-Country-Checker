import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, MD3LightTheme, configureFonts } from 'react-native-paper';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Registration from './src/pages/Registration';
import Account from './src/pages/Account';
import Countries from './src/pages/Countries';
import CountryDetails from './src/pages/CountryDetails';
import { useFonts } from 'expo-font';

const fontConfig = {
  fontFamily: 'Montserrat-Regular',
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0,
  fontWeight: '400' as const,
};

const lightFontConfig = {
  fontFamily: 'Montserrat-Light',
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0,
  fontWeight: '300' as const,
};

const customFonts = configureFonts({
  config: {
    displayLarge: fontConfig,
    displayMedium: fontConfig,
    displaySmall: fontConfig,
    headlineLarge: fontConfig,
    headlineMedium: fontConfig,
    headlineSmall: fontConfig,
    titleLarge: fontConfig,
    titleMedium: fontConfig,
    titleSmall: fontConfig,
    labelLarge: fontConfig,
    labelMedium: fontConfig,
    labelSmall: fontConfig,
    bodyLarge: fontConfig,
    bodyMedium: fontConfig,
    bodySmall: lightFontConfig,
  },
});

const theme = {
  ...MD3LightTheme,
  fonts: customFonts,
  colors: {
    ...MD3LightTheme.colors,
    background: '#eee7f8',
  }
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
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
    </PaperProvider>
  );
}