import * as React from 'react';
import { Avatar, Button, Card, Text, Title } from 'react-native-paper';

const Home = () => (
    <>
    <Title>CountryCruxCH</Title>
  <Card>
    <Card.Content>
      <Text variant="titleLarge">What is this?</Text>
      <Text variant="bodyMedium">
        Supporting line text lorem ipsum dolor sit amet, consectetur.
        Supporting line text lorem ipsum dolor sit amet, consectetur. Supporting line text lorem ipsum dolor sit amet,
        consectetur. Supporting line text lorem ipsum dolor sit amet, consectetur.
        Supporting line text lorem ipsum dolor sit amet, consectetur. Supporting line text lorem ipsum dolor sit amet, consectetur.
        Supporting line text lorem ipsum dolor sit amet, consectetur.
    </Text>
    </Card.Content>
  </Card>
  <Text>Want to see the countries?</Text>
  <Button>Click here</Button>
  </>
);

export default Home;