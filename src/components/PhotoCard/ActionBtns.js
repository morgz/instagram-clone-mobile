import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Touchable from '@appandflow/touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { makeHitSlop } from '../../utils/themes';

const styles = StyleSheet.create({
  root: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  actionsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  actionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeView: {
    flex: 1.5,
  },
  bookmarkWrapper: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

class ActionBtns extends Component {
  state = { }
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.actionsWrapper}>
          <Touchable hitSlop={makeHitSlop(20)} feedback='opacity' style={styles.actionBtn}>
            <Ionicons name='ios-heart-outline' size={30} />
          </Touchable>
          <Touchable hitSlop={makeHitSlop(20)} feedback='opacity' style={styles.actionBtn}>
            <EvilIcons name='comment' size={35} />
          </Touchable>
          <Touchable hitSlop={makeHitSlop(20)} feedback='opacity' style={styles.actionBtn}>
            <Ionicons name='ios-send-outline' size={35} />
          </Touchable>
        </View>
        <View style={styles.fakeView} />
        <View />
        <Touchable hitSlop={makeHitSlop(20)} feedback='opacity' style={styles.bookmarkWrapper}>
          <Ionicons name='ios-bookmark-outline' size={35} />
        </Touchable>
      </View>
    );
  }
}

export default ActionBtns;
