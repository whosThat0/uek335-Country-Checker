import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
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
    fontSize: 22,
    marginTop: 15,
    marginBottom: 20,
    alignSelf: 'center',
  },
  textInputFieldLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  nameValue: {
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
  button: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    elevation: 4,
    borderRadius: 6,
  },
});

export default function CountryAdd({ navigation }) {
  const [countryName, setCountryName] = useState('');
  const [countryContinent, setCountryContinent] = useState('');
  const [isFocus, setIsFocus] = useState(false);


/**
* HanldeAdding function to add a new country.
* 
* Validates the country name and continent selection, then sends a Post request to the API to add the country.
* Displays an alert if there are validation errors or if the request fails to inform the user.
* If successful, navigates back to the Countries screen.
*/
    
    const handleAdding = async () => {
    if (!countryName.trim()) {
      Alert.alert('Error', 'Country name cannot be empty.');
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(countryName.trim())) {
      Alert.alert('Error', 'Country name can only contain letters and spaces.');
      return;
    }
    if (!countryContinent) {
      Alert.alert('Error', 'Please select a continent.');
      return;
    }
    try {
      await api.post('/country', {
        country_name: countryName,
        continent: countryContinent,
      });
      console.log('Country added!');
      navigation.navigate('MainTabs', { screen: 'Countries' });
    } catch (error) {
      console.error('Error adding country:', error);
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
      <Text style={styles.pageHeader}>Add a Country</Text>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.textInputFieldLabel}>Country Name:</Text>
          <TextInput
            value={countryName}
            onChangeText={setCountryName}
            style={styles.nameValue}
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
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handleAdding}
        style={styles.button}
      >
        Save Country
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('MainTabs', { screen: 'Countries' })}
        style={[styles.button, { backgroundColor: '#f0f0f0' }]}
      >
        Cancel
      </Button>
    </SafeAreaView>
  );
}
