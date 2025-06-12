import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  Text,
  Card,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../services/UserService'; // no need for getCurrentUser here

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginTop: 70,
    marginVertical: 24,
    color: '#333',
  },
  card: {
    width: '100%',
    borderRadius: 12,
    paddingTop: 16,
  },
  cardTitle: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 30,
  },
  actions: {
    justifyContent: 'flex-end',
    paddingRight: 8,
  },
});

export default function Account({ navigation, setIsLoggedIn = () => {} }) {
  const theme = useTheme();

  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    age: '',
  });

useEffect(() => {
  const fetchUserFromStorage = async () => {
    try {
      const [email, firstName, lastName, age] = await Promise.all([
        AsyncStorage.getItem("email"),
        AsyncStorage.getItem("firstname"),
        AsyncStorage.getItem("lastname"),
        AsyncStorage.getItem("age"),
      ]);

      setUser({
        email: email || '',
        firstName: firstName || '',
        lastName: lastName || '',
        age: age || '',
      });

      console.log("Loaded user from AsyncStorage:", { email, firstName, lastName, age });
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  };

  fetchUserFromStorage();
}, []);



  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'id', 'firstname', 'lastname', 'email', 'age']);
      console.log('User data removed from AsyncStorage');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Logout Error', 'Something went wrong while logging out.');
    }
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.secondaryContainer }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Account Information</Text>

        <Card style={styles.card}>
          <Card.Title title="Your Account" titleStyle={styles.cardTitle} />

          <Card.Content>
            <InfoLabel label="Email" value={user.email} />
            <InfoLabel label="First name" value={user.firstName} />
            <InfoLabel label="Last name" value={user.lastName} />
            <InfoLabel label="Age" value={user.age} />
          </Card.Content>

          <Card.Actions style={styles.actions}>
            <IconButton icon="logout" size={20} onPress={handleLogout} />
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoLabel = ({ label, value }) => (
  <View style={{ marginBottom: 35 }}>
    <Text style={{ fontSize: 15, color: '#555' }}>{label}</Text>
    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{value}</Text>
  </View>
);

