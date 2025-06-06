import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CountryService from './src/services/CountryService';
import accessToken  from './src/services/api';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Our Country App</Text>
      <StatusBar style="auto" />
    </View>
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
