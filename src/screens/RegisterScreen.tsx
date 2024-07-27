import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginUserAction} from '../redux/slices/authSlice';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Button title="Go to Login" onPress={() => dispatch(loginUserAction())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
