import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text, Title, useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    paddingBottom: 100
  },
  title: {
    marginTop: 70,
    fontSize: 22,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
  },
  card: {
    width: '100%',
    marginVertical: 20,
    borderRadius: 12,
  },
 cardTitle: {
    marginBottom: 10,
    fontFamily: 'Montserrat-Light',
    fontSize: 20,
  },
  cardText: {
    lineHeight: 20,
    fontFamily: 'Montserrat-Light',
  },
  question: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,                
    alignSelf: 'flex-start',     
    textAlign: 'left',         
  },
  button: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    elevation: 4,
    borderRadius: 6,
  },
});

const Home = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.secondaryContainer }]}>
      <View style={styles.container}>
        <Title style={styles.title}>CountryCruxCH</Title>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>
              What is this?
            </Text>
            <Text style={styles.cardText}>
              On our page, you can explore a wide range of countries from all around the world.{"\n"}
              Each country includes interesting facts, cultural highlights, and key information to help you learn more.{"\n"}
              You can also add your own countries to the list and share what you know.{"\n"}
              Our goal is to create a fun and educational space for everyone who loves geography and travel.{"\n"}
              There's so much more to discover—dive in and start exploring today!
            </Text>
          </Card.Content>
        </Card>

        <Text style={styles.question}>
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
      </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Home;