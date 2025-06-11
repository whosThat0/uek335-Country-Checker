import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function CountryDetails() {
  return (
    <SafeAreaView>
      <Text>Country Details</Text>
      <Text>More information about the selected country will be displayed here.</Text>
      <TouchableOpacity onPress={() => console.log("More details pressed")}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>View More Details</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}