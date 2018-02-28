import React, { PureComponent } from 'react';
import { View, TextInput, Keyboard, StyleSheet, ActivityIndicator } from 'react-native';
import Touchable from '@appandflow/touchable';
import { createCommentMutation } from '../../graphql/mutations/';
import { graphql } from 'react-apollo';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  commentInput: {
    width: '100%',
    padding: 15,
    marginTop: 10,
    height: 100,
  },
});

class CreateCommentScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      comment: '',
    };

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
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

  _onSharePress = async () => {
    this.setState({ loading: true });
    const res = await this.props.onCreateComment(this.props.data.id, this.state.comment);
    this.setState({ loading: false });
    this.props.navigator.pop();
  }

  _onCommentChange = value => this.setState({ comment: value })

  _onNavigatorEvent = e => {
    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'cancel') {
        this.props.navigator.back();
      }
      if (e.id === 'shareComment') {
        this._onSharePress();
      }
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.root}><ActivityIndicator size="large" /></View>
      );
    }

    return (
      <View style={styles.root}>
        <View style={styles.commentWrapper}>
          <TextInput
            autoFocus
            underlineColorAndroid="transparent"
            style={styles.commentInput}
            placeholder="Write a Comment"
            multiline
            value={this.state.comment}
            onChangeText={this._onCommentChange}
          />
        </View>
      </View>
    );
  }
}

// export default graphql(createCommentMutation)(CreateCommentScreen);

export default graphql(createCommentMutation, {
  props: ({ mutate }) => ({
    onCreateComment: (photoId, text) => mutate({ variables: { photoId, text } }),
  }),
})(CreateCommentScreen);
