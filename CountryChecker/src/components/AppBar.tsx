import { Appbar, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

export default function () {
  return (
    <Appbar.Header>
      <Appbar.Content title="My Application" />
      <Appbar.Action icon="home" onPress={() => console.log('Home pressed')} />
      <Appbar.Action icon="flag" onPress={() => console.log('Flag pressed')} />
        <Appbar.Action icon="account" onPress={() => console.log('Profile pressed')} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
    bottomAppbar: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});