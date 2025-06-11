import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Card,
  useTheme,
  IconButton,
  Button,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';


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
    maxWidth: 350,
    borderRadius: 12,
    paddingBottom: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  actions: {
    justifyContent: 'flex-end',
    paddingRight: 8,
  },
});


export default function Account({ navigation }) {
  const theme = useTheme();

  const user = {
    email: 'JohnDoe@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'female',
    birthdate: '18/07/2025',
  };

  const handleLogout = () => {
    // Handle logout
    console.log('Logging out...');
    // Clear user data or token if needed
    navigation.navigate('Login');
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
            <InfoLabel label="Gender" value={user.gender} />
            <InfoLabel label="Birthdate" value={user.birthdate} />
          </Card.Content>

          <Card.Actions style={styles.actions}>
            <Button onPress={handleLogout}>Log out</Button>
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
    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{value}</Text>
  </View>
);
