import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { iOSColors } from 'react-native-typography';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 0.3,
    backgroundColor: 'purple',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: 'blue',
    alignSelf: 'stretch',
  },
  appName: {
    color: iOSColors.white,
    fontSize: 50,
  },
});

class LoginScreen extends Component {
  state = { }
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.appName}>Danagram</Text>
        </View>
        <View style={styles.content} />
      </View>
    );
  }
}

export default LoginScreen;
