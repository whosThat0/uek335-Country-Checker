import React from 'react';
import { Text, ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
import { Chip } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#e8def8',
    position: 'relative',
  },
  pageHeader: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  innerContainerCountryData: {
    width: '100%',
    alignItems: 'center',
  },
  countryCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  id: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  addCountry: {
    position: 'absolute',
    right: 24,
    bottom: 60,
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    zIndex: 10,
  },
  filterChip: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    marginRight: 8,
    marginBottom: 8
  }
});

export default function Countries({ navigation }) {
  const theme = useTheme();
  type Country = {
    id: number;
    country_name: string;
    continent: string;
  };

  const [countries, setCountries] = React.useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);

   /**
    * Fetches the list of countries from the API.
    * 
    * This function retrieves the list of countries from the backend /country endpoint of the
    * API and updates the state with the fetched data.
    * It handles any errors that may occur during the fetch operation.
    * @param {Function} setCountries - Function to update the state with the fetched countries.
    * @return {Promise<void>} A promise that resolves when the countries are fetched successfully.
    */
  const fetchCountries = async () => {
    try {
      const response = await api.get('/country');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

   /**
    * Filters the list of countries based on the provided search query and selected continents.
    * This function is case-insensitive and checks if the country name includes the search query,
    * as well as if the country belongs to any of the selected continents.
   */
    const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.country_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegions.length === 0 || selectedRegions.includes(country.continent);
    return matchesSearch && matchesRegion;
  });


  /**
   * Deletes country by it's Id.
   * 
   * This function sends a Delete request to the API to remove a country with the specified Id.
   * After it was deleted successfully, it fetches the updated list of countries.
   */
  const deleteCountry = async (id: number): Promise<void> => {
    try {
      await api.delete(`/country/${id}`);
      console.log(`Deleted Country with ID: ${id}`);
      fetchCountries();
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  /**
   * Confirms the deletion of a country.
   * 
   * This function displays an alert to confirm if the user really wants to delete the country.
   * If confirmed, it calls the deleteCountry function with the specified country Id.
   * It is used to prevent accidental deletions by requiring user confirmation.
   */
  const confirmDelete = (id: number) => {
    Alert.alert(
      "Delete Country",
      "Are you sure you want to delete this country?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteCountry(id),
        },
      ]
    );
  };

  React.useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.pageHeader}>Countries</Text>
      <Searchbar
        placeholder="Search"
        style={{ margin: 16, borderRadius: 8, backgroundColor: theme.colors.surface, height: 48 }}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 16, marginBottom: 20 }}>
        {['Europe', 'Africa', 'North America', 'South America', 'Antarctica', 'Asia', 'Australia'].map((region) => (
          <Chip
        key={region}
        style={styles.filterChip}
        selected={selectedRegions.includes(region)}
        onPress={() => {
          setSelectedRegions((prev) =>
            prev.includes(region)
          ? prev.filter((r) => r !== region)
          : [...prev, region]
          );
        }}
          >
        {region}
          </Chip>
        ))}
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainerCountryData}>
          {filteredCountries.map((country) => (
            <View key={country.id} style={styles.countryCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardName}>{country.country_name}</Text>
                <View style={styles.iconContainer}>
                  <Ionicons name="information-circle-outline" size={20} color="#000000" onPress={() => navigation.navigate('CountryDetails', { country })} />
                  <Ionicons name="pencil-outline" size={20} color="#000000" onPress={() => navigation.navigate('CountryEdit', { country })} />
                  <Ionicons name="trash-outline" size={20} color="#000000" onPress={() => confirmDelete(country.id)} />
                </View>
              </View>
              <Text style={styles.id}>ID: {country.id}</Text>
              <Text style={styles.id}>Continent: {country.continent}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Button
        mode="contained"
        compact
        style={styles.addCountry}
        buttonColor={theme.colors.primary}
        onPress={() => navigation.navigate('CountryAdd')}
        contentStyle={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </Button>
    </SafeAreaView>
  );
}
