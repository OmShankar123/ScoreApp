import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';

const LoginScreen=({navigation})=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //  login logic to check the user's credentials

  
      const usernameRegex = /^[a-zA-Z0-9]+$/; // Only allow letters and numbers in username
      const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/; // Allow letters, numbers, and some special characters in password
      if (!usernameRegex.test(username)) {
        Alert.alert('Error', 'Username can only contain letters and numbers', [{ text: 'OK' }]);
      } else if (!passwordRegex.test(password)) {
        Alert.alert('Error', 'Password can only contain letters, numbers, and some special characters', [{ text: 'OK' }]);
      } else if (username === 'om123' && password === 'om@123') {
        // The username and password are correct, so navigate to the home screen
        navigation.navigate('Score');
      } else {
        // The username or password is incorrect, so show an error message
        Alert.alert('Error', 'Incorrect username or password', [{ text: 'OK' }]);
      }
    
    
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Score App</Text>

      <View style={styles.inputView}>
        <TextInput
        
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#ffffff"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
        keyboardType='visible-password'
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#ffffff"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text onPress={handleLogin}
        style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#ffffff',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#333333',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#ffffff',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#FFA500',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: '#ffffff',
  },
});

export default LoginScreen;
