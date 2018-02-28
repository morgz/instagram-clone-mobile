import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { PhotoCard } from '../../components';
import { FeedsPhotoFragment } from './fragments';
import { iconsMap } from '../../utils/themes';
import { screens } from '../../utils/constants';

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class FeedsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
    props.navigator.setOnNavigatorEvent(this._onNavigatoEvent.bind(this));
  }

  componentWillMount() {
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'camera',
          icon: iconsMap.camera,
        },
      ],
    });
  }

  _onNavigatoEvent(e) {
    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'camera') {
        console.log('====================================');
        console.log('Camera Buton pressed');
        console.log('====================================');

        this.props.navigator.showModal({
          screen: screens.CreatePhotoScreen,
          title: 'Choose a Photo',
          animationType: 'slide-up',
        });
      }
    }
  }

  _onCreateCommentPress = (data) => {
    console.log('====================================');
    console.log('Photo Comment Pressed');
    console.log('====================================');
    this.props.navigator.push({
      screen: screens.CreateCommentScreen,
      title: 'Create Comment',
      passProps: {
        data,
      },
    });
  }

  _keyExtractor = (item) => item.id

  _renderItem = ({ item }) => <PhotoCard data={item} onCreateCommentPress={this._onCreateCommentPress} />

  _refreshRequest = async () => {
    this.setState({ isRefreshing: true });
    await this.props.data.refetch();
    this.setState({ isRefreshing: false });
  }

  render() {
    if (this.props.data.loading) {
      return (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.data.photos}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._refreshRequest}
          />
        }
      />
    );
  }
}

const getPhotos = gql`
  query {
    photos {
      ...feedsPhoto
    }
  }
  ${FeedsPhotoFragment}
`;

export default graphql(getPhotos)(FeedsScreen);
