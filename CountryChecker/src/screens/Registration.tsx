
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Signup</Text>
          </View>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={{ marginVertical: 8 }}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ marginVertical: 8 }}
          />

          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={{ marginVertical: 8 }}
          />

          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={{ marginVertical: 8 }}
          />

          <TextInput
            label="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            style={{ marginVertical: 8 }}
          />

          <View style={{ marginVertical: 16 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{
                backgroundColor: "#007bff",
                padding: 12,
                borderRadius: 4,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 16 }}>
            {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              <Button title="Signup" onPress={handleSignup} />
            )}
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}