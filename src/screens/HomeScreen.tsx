import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LogOut} from 'lucide-react-native';
import {signOut} from '../redux/slices/authSlice';

const HomeScreen = ({navigation}) => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  console.log({user});

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          columnGap: 10,
          alignSelf: 'flex-end',
        }}>
        <Text style={{color: '#111'}}>{user.email}</Text>
        <LogOut color="red" size={22} onPress={() => dispatch(signOut())} />
      </View>
      <View
        style={{
          alignSelf: 'center',
          rowGap: 10,
          flex: 0.9,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          title="Go to Gallery"
          onPress={() => navigation.navigate('Gallery')}
        />
        <Button
          title="Go to Preview"
          onPress={() => navigation.navigate('Preview')}
        />
        <Button
          title="Go to Selected Media"
          onPress={() => navigation.navigate('SelectedMedia')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 12,
    // paddingVertical: 8,
    // rowGap: 6,
  },
});

export default HomeScreen;
