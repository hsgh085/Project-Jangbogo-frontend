import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const SignIn = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      // Redirect to the home screen
      navigate("Home");
    }
  }, []);

  const onLogin = () => {
    // Make an API call to log the user in
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Store the user's ID in localStorage
          localStorage.setItem("userId", data.userId);
          // Redirect to the home screen
          navigate("Home");
        } else {
          // Show an error message
          alert(data.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Phone Number"
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button
        title="Login"
        onPress={onLogin}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: 200,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
});

export default SignIn;