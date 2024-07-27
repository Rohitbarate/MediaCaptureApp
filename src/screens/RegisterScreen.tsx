import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginUserAction} from '../redux/slices/authSlice';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(loginUserAction())}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Light}
        />
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>SignIn with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonContent: {
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RegisterScreen;
