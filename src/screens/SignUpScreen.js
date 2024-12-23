import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Image } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
      // Cek jika ada field yang kosong
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8 || !/\d/.test(password) || !/[A-Za-z]/.test(password)) {
      Alert.alert('Error', 'Password must consist of 8 characters or more, with a combination of letters and numbers');
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      await AsyncStorage.setItem('userName', name); // Store the user's name separately
      Alert.alert('Success', 'You have successfully signed up!');
      navigation.navigate('LogIn'); // Ensure this is the correct name of your login screen in the navigator
    } catch (e) {
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/welcome.png')}/>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <TextInput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate('LogInScreen')} style={styles.loginText}>
        Already have an account? Log In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a7cafc',
    padding: 20
  },
  headerText: {
    fontSize: 24,
    color: '#0000CD',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20
  },
  input: {
    width: '90%',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5
  },
  button: {
    backgroundColor: 'cornflowerblue',
    width: '90%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loginText: {
    color: 'cornflowerblue',
    marginTop: 20,
    textDecorationLine: 'underline'
  }
});

export default SignUpScreen;

