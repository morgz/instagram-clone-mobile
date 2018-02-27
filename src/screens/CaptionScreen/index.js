import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../utils/themes';
import { Divider } from '../../components';
import Touchable from '@appandflow/touchable';

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
  state = {
    caption: '',
  }

  _onCaptionChange = text => this.setState({ caption: text });

  render() {
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

export default CaptionScreen;
