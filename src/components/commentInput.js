import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { iOSColors } from 'react-native-typography';
import Touchable from '@appandflow/touchable';

import { fakeAvatarUrl } from '../utils/constants';
import { makeHitSlop, makeCircle } from '../utils/themes';

const styles = StyleSheet.create({
  root: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    ...makeCircle(30),
  },
  avatarWrapper: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    color: iOSColors.lightGray2,
  },
  input: {
    borderWidth: 1,
    borderColor: iOSColors.lightGray2,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '95%',
    borderRadius: 20,
  },
});

class CommentInput extends Component {
  state = { }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: fakeAvatarUrl }} style={styles.avatar} />
        </View>
        <Touchable feedback='opacity' hitSlop={makeHitSlop(20)} style={styles.inputWrapper} onPress={this.props.onCreateCommentPress}>
          <View style={styles.input}>
            <Text style={styles.inputText}>Add a comment...</Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

export default CommentInput;
