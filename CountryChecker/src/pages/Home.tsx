import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, Card, Text, Title, useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppBar from '../components/AppBar';

const Home = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Title style={styles.title}>CountryCruxCH</Title>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={[styles.cardTitle, { fontFamily: 'Montserrat-Light' }]}>
              What is this
            </Text>
            <Text style={[styles.cardText, { fontFamily: 'Montserrat-Light' }]}>
              On our page, you can explore a wide range of countries from all around the world.{"\n"}
              Each country includes interesting facts, cultural highlights, and key information to help you learn more.{"\n"}
              You can also add your own countries to the list and share what you know.{"\n"}
              Our goal is to create a fun and educational space for everyone who loves geography and travel.{"\n"}
              There's so much more to discover—dive in and start exploring today!
            </Text>
          </Card.Content>
        </Card>

        <Text style={[styles.question, { fontFamily: 'Montserrat-Light' }]}>
          Want to see the countries?
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Countries')}
          style={styles.button}
          buttonColor={theme.colors.primary}
        >
          Click here
        </Button>
        <AppBar navigation={navigation}></AppBar>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    marginVertical: 20,
    borderRadius: 12,
  },
  cardTitle: {
    marginBottom: 10,
  },
  cardText: {
    lineHeight: 20,
  },
  question: {
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    elevation: 4,
    borderRadius: 6,
  },
});

export default Home;