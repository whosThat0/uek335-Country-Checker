import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const styles =  StyleSheet.create({
    container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    paddingBottom: 100
  },
  title: {
    marginTop: 70,
    fontSize: 22,
  },
});

export default function Countries({ navigation }) {
  const theme = useTheme();

  return (
    <>
    <SafeAreaProvider>
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.secondaryContainer }]}>
    <View style={styles.container}>
    <Text style={styles.title}>
      Countries
    </Text>
    </View>
    </ScrollView>
    </SafeAreaProvider>
    </>
  );
}