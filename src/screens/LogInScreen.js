import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      if (user && user.email === email && user.password === password) {
        await AsyncStorage.setItem('userName', user.name); // Save or update the user's name in storage on successful login
        Alert.alert('Success', 'Logged In Successfully');
        navigation.navigate('Home');
      } else if (user && user.email !== email) {
        Alert.alert('Login Failed', 'Unrecognized email, please sign up first');
      } else {
        Alert.alert('Login Failed', 'Wrong password, please enter the correct password');
      }
    } catch (e) {
      Alert.alert('Error', 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/welcome.png')} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <TouchableOpacity onPress={handleLogIn} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate('SignUp')} style={styles.linkText}>
        Don't have an account yet? Sign Up
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
    marginBottom: 20,
    color: 'white',
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
  linkText: {
    color: 'cornflowerblue',
    marginTop: 20,
    textDecorationLine: 'underline'
  }
});

export default LogInScreen;
