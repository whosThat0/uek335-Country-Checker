import * as React from 'react';
import { Button, Card, Text, Title } from 'react-native-paper';
import { ParamListBase, useNavigation } from '@react-navigation/native';

const Home = ({navigation}) => {
  return (
    <>
      <Title>CountryCruxCH</Title>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">What is this?</Text>
          <Text variant="bodyMedium">
           This is our Country Page Project. On our page you can find a lot of different countries, add countries and 
           a lot of more things. 
          </Text>
        </Card.Content>
      </Card>

      <Text>Want to see the countries?</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Countries')}>
        Click here
      </Button>
    </>
  );
};

export default Home;