import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Touchable from '@appandflow/touchable';
import { human, iOSColors } from 'react-native-typography';
import { graphql } from 'react-apollo';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';

import Header from './Header.js';
import ActionBtns from './ActionBtns.js';
import Meta from './Meta.js';
import CommentInput from '../commentInput';
import { likePhotoMutation } from '../../graphql/mutations';
import { FeedsPhotoFragment } from '../../screens/FeedsScreen/fragments';

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
    this.props.onLikePhotoMutation();
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

export default graphql(likePhotoMutation, {
  props: ({ mutate, ownProps }) => ({
    onLikePhotoMutation: () =>
      mutate({
        variables: { photoId: ownProps.data.id },
        update: (store, { data: { likePhoto } }) => {
          const id = defaultDataIdFromObject({
            __typename: 'Photo',
            id: ownProps.data.id,
          });

          const photo = store.readFragment({
            id,
            fragment: FeedsPhotoFragment,
          });

          store.writeFragment({
            id,
            fragment: FeedsPhotoFragment,
            data: {
              ...photo,
              likesPhoto: likePhoto,
            },
          });

          console.log('====================================');
          console.log('likePhoto', likePhoto);
          console.log('====================================');
        },
      }),
  }),
})(PhotoCard);
