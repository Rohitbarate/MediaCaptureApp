import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SelectedMediaScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Selected Media Screen</Text>
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

export default SelectedMediaScreen;
