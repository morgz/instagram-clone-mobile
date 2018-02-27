import React, { PureComponent } from 'react';
import { StyleSheet, View, CameraRoll, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import Touchable from '@appandflow/touchable';
import { iOSColors } from 'react-native-typography';
import { screens } from '../../utils/constants.js';

const MAX_PHOTOS = 20;
const PADDING = 17;
const MARGIN = 10;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    borderRadius: 3,
    flex: 1,
  },
  imageWrapper: {
    width: (width - PADDING * 2 - MARGIN * 2) / 3,
    height: (width - PADDING * 2 - MARGIN * 2) / 3,
    borderRadius: 3,
    marginHorizontal: MARGIN,
    marginVertical: '2.5%',
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: iOSColors.blue,
    borderBottomWidth: 5,
  },
});

class CreatePhotoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: false,
      selected: null,
      hasNextPage: false,
      endCursor: '',
      firstQuery: true,
    };
    props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this._getPhotos();
    this._setCancelButton();
  }

  _onSelect = (item) => {
    this.setState({ selected: item });

    this.props.navigator.setButtons({
      rightButtons: [{
        id: 'goToCaption',
        title: 'Next',
      }],
      animated: true,
    });
  }

  _onNavigatorEvent = (e) => {
    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'cancel') {
        this.props.navigator.dismissModal();
      } else if (e.id === 'goToCaption') {
        this.props.navigator.push({
          screen: screens.CaptionScreen,
          title: 'Create Photo',
          passProps: {
            image: this.state.selected,
          },
        });
      }
    }
  }

  _setCancelButton = () => {
    this.props.navigator.setButtons({
      leftButtons: [{
        id: 'cancel',
        title: 'Cancel',
      }],
      animated: true,
    });
  }

  _getPhotos = async after => {
    if (this.state.firstQuery) {
      this.setState({ loading: true });
    }

    const res = await CameraRoll.getPhotos({
      first: MAX_PHOTOS,
      after,
    });

    this.setState({
      images: [...this.state.images, ...res.edges],
      loading: false,
      hasNextPage: res.page_info.has_next_page,
      endCursor: res.page_info.end_cursor,
      firstQuery: false,
    });

    console.log('====================================');
    console.log('res', res);
    console.log('====================================');
  }

  _renderItem = ({ item }) => {
    const isSelected =
      this.state.selected &&
      this.state.selected.node.image.filename === item.node.image.filename;

    return (
      <Touchable
        disabled={isSelected}
        onPress={() => this._onSelect(item)}
        feedback='opacity'
        style={styles.imageWrapper}
      >
        <Image source={{ uri: item.node.image.uri }} style={styles.image} />
        {isSelected && <View style={styles.imageHover} />}
      </Touchable>
    );
  }

  _keyExtractor = item => (
    item.node.image.filename
  )

  _onEndReach = () => {
    if (this.state.onEndReached === false) {
      this._getPhotos(this.state.endCursor);
    }
  }

  // _keyExtractor = item => item.node.image.filename

  render() {
    console.log('====================================');
    console.log('state', this.state);
    console.log('====================================');

    if (this.state.loading) {
      return (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View>
        <FlatList
          data={this.state.images}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={3}
          extraData={this.state}
          onEndReached={this._onEndReached}
        />
      </View>
    );
  }
}

export default CreatePhotoScreen;
