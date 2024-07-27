import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PreviewScreen from '../screens/PreviewScreen';
import GalleryScreen from '../screens/GalleryScreen';
import SelectedMediaScreen from '../screens/SelectedMediaScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="SelectedMedia" component={SelectedMediaScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
