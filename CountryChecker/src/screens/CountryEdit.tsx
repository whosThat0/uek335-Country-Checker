import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import api from '../services/api';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#e8def8',
    padding: 20,
  },
  pageHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  textInputFieldLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 4,
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default function CountryEdit({ navigation, route }) {
  const { country } = route.params;

  const [countryName, setCountryName] = useState(country.country_name);
  const [countryContinent, setCountryContinent] = useState(country.continent);
  const [isFocus, setIsFocus] = useState(false);

  const handleUpdate = async () => {
    try {
      await api.put(`/country/${country.id}`, {
        country_name: countryName,
        continent: countryContinent,
      });
      console.log("Country updated!");
      navigation.navigate('MainTabs', { screen: 'Countries' });
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };

  const continent = [
    { label: 'Asia', value: 'Asia' },
    { label: 'Africa', value: 'Africa' },
    { label: 'North America', value: 'North America' },
    { label: 'South America', value: 'South America' },
    { label: 'Antarctica', value: 'Antarctica' },
    { label: 'Europe', value: 'Europe' },
    { label: 'Australia', value: 'Australia' },
  ];

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.pageHeader}>Edit Country</Text>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.textInputFieldLabel}>Country Name:</Text>
          <TextInput
            value={countryName}
            onChangeText={setCountryName}
            style={styles.value}
            mode="flat"
          />

          <Text style={styles.textInputFieldLabel}>Country Continent:</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={continent}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select a continent' : '...'}
            searchPlaceholder="Search..."
            value={countryContinent}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCountryContinent(item.value);
              setIsFocus(false);
            }}
          />

          <Text style={styles.textInputFieldLabel}>Country ID:</Text>
          <Text style={styles.value}>{country.id}</Text>
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handleUpdate}
        style={{ marginBottom: 12 }}
      >
        Save Changes
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('MainTabs', { screen: 'Countries' })}
      >
        Cancel
      </Button>
    </SafeAreaView>
  );
}
