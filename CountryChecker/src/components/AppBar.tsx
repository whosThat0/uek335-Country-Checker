import { Appbar, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const BOTTOM_APPBAR_HEIGHT = 90;

export default function AppBar({ navigation }) {
  return (
    <Appbar style={styles.bottomAppbar}>
      <Appbar.Action icon="home" size={35} onPress={() => navigation.navigate('Home')} />
      <Appbar.Action icon="flag" size={35} onPress={() => navigation.navigate('Countries')} />
      <Appbar.Action icon="account" size={35} onPress={() => navigation.navigate('Account')} />
    </Appbar>
  );
}

const styles = StyleSheet.create({
  bottomAppbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTOM_APPBAR_HEIGHT,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});