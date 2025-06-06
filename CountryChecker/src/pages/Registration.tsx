import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://rest-jsondb.sliplane.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok && data.accessToken) {
        await AsyncStorage.setItem("@access_token", data.accessToken);
        Alert.alert("Signup Successful", `Welcome, ${email}!`);
        navigation.navigate("Home");
      } else {
        console.error("Signup failed:", data);
        Alert.alert("Signup Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (_event, selectedDate) => {
    setShowDate(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Signup</Text>
          </View>

          <Text style={{ margin: 15, fontSize: 16 }}>Please enter your credentials:</Text>

          <Text style={{ margin: 10, fontSize: 13 }}>Email:</Text>
          <TextInput
            label="Email"
            onChangeText={setEmail}
          />
          <Text style={{ margin: 10, fontSize: 13 }}>Password:</Text>
          <TextInput
            label ="Password"
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={{ margin: 10, fontSize: 13 }}>First Name:</Text>
          <TextInput
          label="First Name"
          />

          <Text style={{ margin: 10, fontSize: 13 }}>Last Name:</Text>
          <TextInput
            label="Last Name"
          />
          <Text style={{ margin: 10, fontSize: 13 }}>Age:</Text>
          <TextInput
            label="Age"
            keyboardType="numeric"
          />
          <View>
            <Text onPress={() => setShowDate(true)}>Birthday</Text>
            <TextInput
              label="Birthday">
              {showDate && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
              )}
              </TextInput>
          </View>
          <View style={{ margin: 10 }}>
            {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              <Button title="Signup" onPress={handleSignup} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
