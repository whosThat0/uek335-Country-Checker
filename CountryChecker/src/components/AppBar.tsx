
import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AppBar = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'Home', title: 'Home', icon: 'home' },
    { key: 'Countries', title: 'Countries', icon: 'flag' },
    { key: 'Profile', title: 'Profile', icon: 'account' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    Home: () => null,
    Countries: () => null,
    Profile: () => null,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={(newIndex) => {
        setIndex(newIndex);
        const route = routes[newIndex].key;
        navigation.navigate(route as never);
      }}
      renderScene={renderScene}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        elevation: 8, 
        borderTopWidth: 1,
        borderTopColor: '#eee',
      }}
    />
  );
};

export default AppBar;