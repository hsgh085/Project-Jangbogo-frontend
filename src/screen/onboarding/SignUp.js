import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PhoneAuth from "react-native-phone-auth";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    PhoneAuth.initialize();
  }, []);

  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.nativeEvent.text);
  };

  const onVerificationCodeChange = (event) => {
    setVerificationCode(event.nativeEvent.text);
  };

  const onSubmit = () => {
    PhoneAuth.requestVerificationCode(phoneNumber, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        setVerificationCode(data.verificationCode);
      }
    });
  };

  const onVerify = () => {
    PhoneAuth.verifyVerificationCode(phoneNumber, verificationCode, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        setIsVerified(true);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Auth</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          onChangeText={onPhoneNumberChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Verification Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your verification code"
          onChangeText={onVerificationCodeChange}
        />
      </View>
      <Button
        title="Submit"
        onPress={onSubmit}
        style={styles.button}
      />
      {isVerified ? (
        <Text style={styles.verified}>Verified!</Text>
      ) : null}
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
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    width: 200,
    margin: 10,
  },
  label: {
    fontSize: 16,
  },
  input: {
    width: '100%',
    borderRadius: 4,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "blue",
    color: "white",
    borderRadius: 4,
  },
  verified: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SignUp;