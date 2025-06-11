import React from 'react';
import { View, Text, StyleSheet, Card } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8def8',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    marginBottom: 12,
    padding: 12,
  },
  cardContent: {
    padding: 12,
  },
});

export default function CountryDetails({ route, navigation }) {
  const theme = useTheme();
  const { country } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Country Details</Text>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.label}>Country Name:</Text>
          <Text style={styles.value}>{country.country_name}</Text>

          <Text style={styles.label}>Country ID:</Text>
          <Text style={styles.value}>{country.id}</Text>
        </View>
      </View>
    <Button mode="contained" onPress={() => navigation.navigate('Countries')}>
      back to all the Countries
    </Button>
    </SafeAreaView>
  );
}
