import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import Touchable from '@appandflow/touchable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { human, systemWeights } from 'react-native-typography';

import { makeCircle, makeHitSlop } from '../../utils/themes';
import { fakeAvatarUrl } from '../../utils/constants';

const styles = StyleSheet.create({
  root: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  userMetaWrapper: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  btnWrapper: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    flex: 0.20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    ...makeCircle(40),
  },
  userInfoWrapper: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  username: {
    ...human.subheadObject,
  },
  location: {
    ...human.footnoteObject,
    ...systemWeights.light,
  },
});

export default function Header({
  avatarImageUrl = fakeAvatarUrl,
  username = 'Dan Morgz',
  location = 'Mold, North Wales',
}) {
  return (
    <View style={styles.root}>
      <View style={styles.userMetaWrapper}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatarImageUrl }} style={styles.avatarImg} />
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
      <Touchable hitSlop={makeHitSlop(20)} feedback="opacity" style={styles.btnWrapper}>
        <MaterialCommunityIcons name="dots-horizontal" size={25} />
      </Touchable>
    </View>
  );
}
