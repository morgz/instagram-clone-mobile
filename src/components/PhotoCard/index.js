import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Touchable from '@appandflow/touchable';
import { human, iOSColors } from 'react-native-typography';
import { graphql } from 'react-apollo';

import Header from './Header.js';
import ActionBtns from './ActionBtns.js';
import Meta from './Meta.js';
import CommentInput from '../commentInput';
import { likePhotos } from '../../graphql/mutations';

const styles = StyleSheet.create({
  root: {
    minHeight: 600,
    paddingBottom: 10,
  },
  image: {
    flex: 1,
  },
  commentsWrapper: {
    height: 50,
    paddingHorizontal: 16,
  },
  commentViewAll: {
    ...human.calloutObject,
    color: iOSColors.midGray,
  },
  timeAgoWrapper: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  timeAgo: {
    ...human.footnoteObject,
    color: iOSColors.midGray,
  },
});

class PhotoCard extends Component {
  state = {};

  _onLikedPress = async () => {
    console.log('====================================');
    console.log('you like me', this.props.data);
    console.log('====================================');

    try {
      const res = await this.props.likePhotoMutation({
        variables: {
          photoId: this.props.data.id,
        },
      });

      console.log('====================================');
      console.log('like response:', res);
      console.log('====================================');
    } catch (error) {
      console.log('====================================');
      console.log('like error', error);
      console.log('====================================');
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <Header />
        <Image
          style={styles.image}
          source={{
            uri: this.props.data.imageUrl,
          }}
        />
        <ActionBtns likesPhoto={this.props.data.likesPhoto} onLikedPress={this._onLikedPress} />
        <Meta caption={this.props.data.caption} />
        <View style={styles.commentsWrapper}>
          <Touchable feedback="opacity">
            <Text style={styles.commentViewAll}>View all 13 comments</Text>
          </Touchable>
          <CommentInput />
        </View>
        <View style={styles.timeAgoWrapper}>
          <Text style={styles.timeAgo}>6 HOURS AGO</Text>
        </View>
      </View>
    );
  }
}

export default graphql(likePhotos, { name: 'likePhotoMutation' })(PhotoCard);
