import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Card,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../services/UserService';

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
    paddingTop: 16
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

export default function Account({ navigation, setIsLoggedIn }) {
  const theme = useTheme();

  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    age: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser && currentUser.data && currentUser.data.user) {
          setUser({
            email: currentUser.data.user.email,
            firstName: currentUser.data.user.firstname,
            lastName: currentUser.data.user.lastname,
            age: currentUser.data.user.birthday,
          });
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('Userdata removed from AsyncStorage');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
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

const InfoLabel = ({ label, value }: { label: string; value: string }) => (
  <View style={{ marginBottom: 35 }}>
    <Text style={{ fontSize: 15, color: '#555' }}>{label}</Text>
    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{value}</Text>
  </View>
);
