import React, { PureComponent } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Touchable from '@appandflow/touchable';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
class CreateCommentScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { };

    props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          id: 'shareComment',
          title: 'Share',
        },
      ],
      animated: true,
    });
  }

  _onNavigatorEvent = e => {
    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'cancel') {
        this.props.navigator.back();
      }
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <Text>{`Photo with id ${this.props.data.id}`}</Text>
      </View>
    );
  }
}

export default CreateCommentScreen;
