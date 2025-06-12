import React from 'react';
import { View, Text, StyleSheet, Card } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8def8',
    padding: 16,
  },
  title: {
    fontSize: 22,
    marginTop: 60,
    marginBottom: 20,
    alignSelf: 'center',
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
    button: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    elevation: 4,
    borderRadius: 6,
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
    <Button
              mode="contained"
              onPress={() => navigation.navigate('MainTabs', { screen: 'Countries' })}
              style={styles.button}
              buttonColor={theme.colors.primary}
            >
              Back to all the countries
            </Button>
    </SafeAreaView>
  );
}
