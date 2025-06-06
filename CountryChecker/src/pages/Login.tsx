import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://rest-jsondb.sliplane.app/login", {
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
        Alert.alert("Login Successful ", `Welcome, ${email}!`);
        navigation.navigate('Home');
      } else {
        console.error("Login failed:", data);
        console.error("Caught error:", JSON.stringify(Error, null, 2));
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Login</Text>
        </View>

        <Text style={{ margin: 15, fontSize: 16 }}>Please enter your credentials:</Text>

        <Text style={{ margin: 10, fontSize: 13 }}>Username:</Text>
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

        <View style={{ margin: 10 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <Button title="Login" onPress={handleLogin} />
          )}
          <Button title="Register" onPress={() => navigation.navigate('Registration')} color="#007bff" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
