import React from 'react';
import { Text,  ScrollView, View, StyleSheet } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

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

  const handlePress = () => {
    console.log("Floating button pressed");
  };

  const fetchCountries = async () => {
    try {
      const response = await api.get('/country');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
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
                <Ionicons name="information-circle" size={20} color="#000000" onPress={() => console.log("Country ausgewählt:", country.id)} />
                <Ionicons name="checkmark" size={20} color="#000000" onPress={() => console.log("Country genehmigt:", country.id)} />
                <Ionicons name="trash" size={20} color="#000000" onPress={() => console.log("Country gelöscht:", country.id)} />
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
