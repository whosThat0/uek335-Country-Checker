import React from 'react';
import { Text,  ScrollView, View, StyleSheet } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
import { Alert } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8def8',
    position: 'relative',
  },
  title: {
  fontSize: 22,
  marginTop: 60,
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
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
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
  name: {
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
});




export default function Countries({ navigation }) {
  const theme = useTheme();
  const [countries, setCountries] = React.useState([]);

  const fetchCountries = async () => {
    try {
      const response = await api.get('/country');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const deleteCountry = async (id: number): Promise<void> => {
  try {
    await api.delete(`/country/${id}`);
    console.log(`Deleted Country with ID: ${id}`);
    fetchCountries();
  } catch (error) {
    console.error("Error deleting country:", error);
  }
};

  
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
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Countries</Text>

    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.innerContainer}>
        {countries.map((country) => (
          <View key={country.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{country.country_name}</Text>
              <View style={styles.iconContainer}>
                <Ionicons name="information-circle-outline" size={20} color="#000000"  onPress={() => navigation.navigate('CountryDetails', { country })}/>
                <Ionicons name="pencil-outline" size={20} color="#000000" onPress={() => console.log ("Country Edited")} />
                <Ionicons name="trash-outline" size={20} color="#000000" onPress={() => confirmDelete(country.id)} />
              </View>
            </View>
            <Text style={styles.id}>ID: {country.id}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
);
}
