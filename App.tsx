import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigators/RootStack';
import AuthStack from './src/navigators/AuthStack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useSelector} from 'react-redux';
// import { Provider } from 'react-redux'
// import store from './src/redux/store'

const App = () => {
  const user = useSelector((state: any) => state.auth.user);
  const loading = useSelector((state: any) => state.auth.loading);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '240651402724-3cla1g6istpd2gcrci6ljd5kplkgk96i.apps.googleusercontent.com',
    });

    GoogleSignin.signOut();
  }, []);
  return (
    <NavigationContainer>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>
      ) : user ? (
        <RootStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default App;
