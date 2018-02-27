import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../utils/themes';

const styles = StyleSheet.create({
  root: {
    height: 1,
    width: '100%',
    backgroundColor: colors.lightGray,
  },
});

export default function Divider() {
  return <View style={styles.root} />;
}
