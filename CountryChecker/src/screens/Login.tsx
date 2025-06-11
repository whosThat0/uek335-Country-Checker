import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TextInput, useTheme } from "react-native-paper";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const style: {
  errorMessage: TextStyle;
  button: ViewStyle;
  textField: ViewStyle;
  title: TextStyle;
} = {
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  textField: {
    marginVertical: 7,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "light",
    marginBottom: 20,
  },
};

export default function Login({ navigation, setIsLoggedIn }) {
   const theme = useTheme(); 

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
        setIsLoggedIn(true);
      } else {
        Alert.alert("Invalid credentials", data.message || "Your login is incorrect, please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView flex style={{ flex: 1, padding: 16, backgroundColor: theme.colors.secondaryContainer }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={style.title}>Login</Text>
        </View>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={style.textField}
            autoCapitalize="none"
            right={
            email.length > 0 ? (
              <TextInput.Icon
                icon={() => <MaterialCommunityIcons name="close" size={20} />}
                onPress={() => setEmail("")}
            />
            ) : null
  }
          />

        <TextInput
          label="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={style.textField}
          right={
            password.length > 0 ? (
              <TextInput.Icon
                icon={() => <MaterialCommunityIcons name="close" size={20} />}
                onPress={() => setPassword("")}
              />
            ) : null
          }
        />
        
       <View style={{ flexDirection: "row", justifyContent: "flex-start", marginVertical: 16 }}>
         <Text style={{ fontSize: 12, color: "#222" }}>Haven't got an account yet? </Text>
         <Text
           style={{ fontSize: 12, color: "#007bff", fontWeight: "bold" }}
           onPress={() => navigation.navigate("Registration")}
         >
           sign up
         </Text>
       </View>
       
       <View style={{ marginVertical: 16, alignItems: "flex-end" }}>
         {loading ? (
           <ActivityIndicator size="small" color="#007bff" />
         ) : (
           <TouchableOpacity
             onPress={handleLogin}
             style={{
               backgroundColor: theme.colors.secondary,
               paddingVertical: 8,
               paddingHorizontal: 18,
               borderRadius: 4,
               alignItems: "center",
             }}
           >
             <Text style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}>Sign in</Text>
           </TouchableOpacity>
         )}
       </View>
       
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
