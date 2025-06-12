import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";


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
      <SafeAreaView flex style={{ flex: 1, padding: 16 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Login</Text>
        </View>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={{ marginVertical: 8 }}
          />

        <TextInput
          label="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={{ marginVertical: 8 }}
        />
          <View style={{ marginVertical: 16 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
              style={{
                backgroundColor: "#007bff",
                padding: 12,
                borderRadius: 4,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ margin: 10 }}>
            {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              <Button title="Login" onPress={handleLogin} />
            )}
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
