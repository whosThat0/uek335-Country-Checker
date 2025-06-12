
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
import { TextInput, useTheme } from "react-native-paper";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import type { ViewStyle, TextStyle } from "react-native";

const style: {
  errorMessage: TextStyle;
  button: ViewStyle;
  textField: ViewStyle;
  title: TextStyle;
} = {
  errorMessage: {
    color: "red",
    fontSize: 10,
    marginTop: -4,
    marginBottom: 4,
  },
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

export default function Signup({ navigation, setIsLoggedIn }) {
  const theme = useTheme(); 

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordValid = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

  const isNameValid = (name) =>
    /^[A-Za-z]+$/.test(name);

  const isAgeValid = (age) => {
    const num = Number(age);
    return /^\d+$/.test(age) && num >= 10 && num <= 100;
  };


  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(isEmailValid(text) ? "" : "Please enter a valid email address.");
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(isPasswordValid(text) ? "" : "Min. 6 chars, letters & numbers.");
  };
  const handleFirstNameChange = (text) => {
    setFirstName(text);
    setFirstNameError(isNameValid(text) ? "" : "Only letters allowed.");
  };
  const handleLastNameChange = (text) => {
    setLastName(text);
    setLastNameError(isNameValid(text) ? "" : "Only letters allowed.");
  };
  const handleAgeChange = (text) => {
    setAge(text);
    setAgeError(isAgeValid(text) ? "" : "Min. age 10, max. 100");
  };

  const handleSignup = async () => {
    let valid = true;
    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (!isPasswordValid(password)) {
      setPasswordError("Min. 6 chars, letters & numbers.");
      valid = false;
    }
    if (!isNameValid(firstName)) {
      setFirstNameError("Only letters allowed.");
      valid = false;
    }
    if (!isNameValid(lastName)) {
      setLastNameError("Only letters allowed.");
      valid = false;
    }
    if (!isAgeValid(age)) {
      setAgeError("Age 10-100, numbers only.");
      valid = false;
    }
    if (!valid) return;

    setLoading(true);
    try {
      const response = await fetch("https://jsonrest-7d8bc7a.onwireway.online/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
        email,
        password,
        firstname: firstName,
        lastname: lastName,
        age,
      }),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok && data.accessToken) {
        await AsyncStorage.setItem("@access_token", data.accessToken);
        await AsyncStorage.setItem("@access_token", data.accessToken);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("firstname", firstName);
        await AsyncStorage.setItem("lastname", lastName);
        await AsyncStorage.setItem("age", age);

        Alert.alert("Signup Successful", `Welcome, ${email}!`);
        setIsLoggedIn(true);
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
      <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: theme.colors.secondaryContainer }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={style.title}>Registration</Text>
        </View>
<TextInput
  label="Email"
  value={email}
  onChangeText={handleEmailChange}
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
{emailError ? <Text style={style.errorMessage}>{emailError}</Text> : null}

<TextInput
  label="Password"
  value={password}
  onChangeText={handlePasswordChange}
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
{passwordError ? <Text style={style.errorMessage}>{passwordError}</Text> : null}

<TextInput
  label="First Name"
  value={firstName}
  onChangeText={handleFirstNameChange}
  style={style.textField}
  right={
    firstName.length > 0 ? (
      <TextInput.Icon
        icon={() => <MaterialCommunityIcons name="close" size={20} />}
        onPress={() => setFirstName("")}
      />
    ) : null
  }
/>
{firstNameError ? <Text style={style.errorMessage}>{firstNameError}</Text> : null}

<TextInput
  label="Last Name"
  value={lastName}
  onChangeText={handleLastNameChange}
  style={style.textField}
  right={
    lastName.length > 0 ? (
      <TextInput.Icon
        icon={() => <MaterialCommunityIcons name="close" size={20} />}
        onPress={() => setLastName("")}
      />
    ) : null
  }
/>
{lastNameError ? <Text style={style.errorMessage}>{lastNameError}</Text> : null}

<TextInput
  label="Age"
  value={age}
  onChangeText={handleAgeChange}
  keyboardType="numeric"
 style={style.textField}
  right={
    age.length > 0 ? (
      <TextInput.Icon
        icon={() => <MaterialCommunityIcons name="close" size={20} />}
        onPress={() => setAge("")}
      />
    ) : null
  }
/>
{ageError ? <Text style={style.errorMessage}>{ageError}</Text> : null}

<View style={{ flexDirection: "row", justifyContent: "flex-start", marginVertical: 16 }}>
  <Text style={{ fontSize: 12, color: "#222" }}>Already have an account? </Text>
  <Text
    style={{ fontSize: 12, color: "#007bff", fontWeight: "bold" }}
    onPress={() => navigation.navigate("Login")}
  >
    sign in
  </Text>
</View>

<View style={{ marginVertical: 16, alignItems: "flex-end" }}>
  {loading ? (
    <ActivityIndicator size="small" color="#007bff" />
  ) : (
    <TouchableOpacity
      onPress={handleSignup}
      style={{
        backgroundColor: theme.colors.secondary,
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 4,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}>Sign up</Text>
    </TouchableOpacity>
  )}
</View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}