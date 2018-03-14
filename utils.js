import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import { store } from './App.js';

const colorList = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#0ff0ff'];

export const generateComponent = (title, action, style) => {
  const backgroundColor = colorList[Math.round(Math.random() * 100) % colorList.length];

  return ({ navigation }) => (
    <View style={style ? style : {
      backgroundColor,
      flex: 1,
    }}>
      <Button
        title={title}
        onPress={() => store.dispatch(action)}
      />
    </View>
  );
}