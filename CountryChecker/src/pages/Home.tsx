import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text, Title, useTheme, Appbar } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const Home = ({ navigation }) => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

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

        <Appbar
          style={[
            styles.bottomAppbar,
            {
              height: BOTTOM_APPBAR_HEIGHT + bottom,
              backgroundColor: theme.colors.elevation.level2,
            },
          ]}
          safeAreaInsets={{ bottom }}
        >
          <Appbar.Action 
            icon="home" 
            onPress={() => console.log('Home pressed')} 
          />
          <Appbar.Action 
            icon="flag" 
            onPress={() => console.log('Flag pressed')} 
          />
          <Appbar.Action 
            icon="account" 
            onPress={() => console.log('Profile pressed')} 
          />
        </Appbar>
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
  bottomAppbar: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
  },
});

export default Home;