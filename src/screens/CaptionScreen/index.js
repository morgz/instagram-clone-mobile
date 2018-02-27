import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import Touchable from '@appandflow/touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import gql from 'graphql-tag';
import { withApollo, graphql } from 'react-apollo';

import { colors } from '../../utils/themes';
import { Divider } from '../../components';
import { uploadImageToS3 } from '../../utils/uploadImage';
import { createPhotoMutation } from '../../graphql/mutations/';
import { FeedsPhotoFragment } from '../../screens/FeedsScreen/fragments';

const signS3Query = gql`
  query {
      presignUrl {
        uploadUrl
        url
      }
  }
`;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 150,
    flexDirection: 'row',
  },
  imgWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 70,
  },
  captionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionInput: {
    width: '100%',
    paddingVertical: 10,
    paddingRight: 10,
    height: 100,
  },
  listItem: {
    height: 40,
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

class CaptionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      caption: '',
      loading: false,
    };

    props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          id: 'sharePost',
          title: 'Share',
        },
      ],
      animated: true,
    });
  }

  _onNavigatorEvent = e => {
    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'sharePost') {
        this._onSharePostPress();
      }
    }
  }

  _onSharePostPress = async () => {
    this.setState({ loading: true });
    const res = await this.props.client.query({ query: signS3Query });

    const resultFromS3 = await uploadImageToS3(
      this.props.image.node.image.uri,
      res.data.presignUrl,
    );

    await this.props.onCreatePhoto({
      imageUrl: resultFromS3.remoteUrl,
      caption: this.state.caption,
    });

    this.setState({ loading: false });
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  _onCaptionChange = text => this.setState({ caption: text });

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <Touchable
        feedback="none"
        style={styles.root}
        onPress={Keyboard.dismiss}
        native={false}
      >
        <View style={styles.header}>
          <View style={styles.imgWrapper}>
            <Image
              source={{ uri: this.props.image.node.image.uri }}
              style={styles.img}
            />
          </View>
          <View style={styles.captionWrapper}>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.captionInput}
              placeholder="Write a Caption"
              multiline
              value={this.state.caption}
              onChangeText={this._onCaptionChange}
            />
          </View>
        </View>
        <Divider />
        <Touchable feedback="opacity" style={styles.listItem}>
          <View>
            <Text>Tags</Text>
          </View>
          <Ionicons
            name='ios-arrow-forward'
            size={20}
            color={colors.lightGray}
          />
        </Touchable>
        <Divider />
      </Touchable>
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

export default graphql(createPhotoMutation, {
  props: ({ mutate }) => ({
    onCreatePhoto: variables =>
      mutate({
        variables,
        update: (store, { data: { createPhoto } }) => {
          const query = store.readQuery({ query: getPhotos });

          store.writeData({
            query: getPhotos,
            data: {
              photos: [createPhoto, ...query.photos],
            },
          });
        },
      }),
  }),
})(withApollo(CaptionScreen));
