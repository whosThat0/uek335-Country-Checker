import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Signup</Text>
          </View>

          <Text style={{ margin: 15, fontSize: 16 }}>Please enter your credentials:</Text>

          <Text style={{ margin: 10, fontSize: 13 }}>Email:</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              paddingLeft: 5,
            }}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your email"
          />
          <Text style={{ margin: 10, fontSize: 13 }}>Password:</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              paddingLeft: 5,
            }}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter your password"
            secureTextEntry
          />

          <Text style={{ margin: 10, fontSize: 13 }}>First Name:</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              paddingLeft: 5,
            }}
            placeholder="Enter your first name"
          />

          <Text style={{ margin: 10, fontSize: 13 }}>Last Name:</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              paddingLeft: 5,
            }}
            placeholder="Enter your last name"
          />
          <Text style={{ margin: 10, fontSize: 13 }}>Age:</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              paddingLeft: 5,
            }}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
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
