import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput } from 'react-native';
import { iOSColors, human, systemWeights } from 'react-native-typography';
import { LoginManager } from 'react-native-fbsdk';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '@appandflow/touchable';

import { fonts } from '../../utils/themes/fonts';

const COLORS_GRADIENTS = ['#74398D', '#56499E'];
const BLUE_COLOR = '#318DEE70';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 0.3,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
  },
  appName: {
    color: iOSColors.white,
    fontSize: 50,
    fontFamily: fonts.lobster,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  sectionBottom: {
    justifyContent: 'flex-start',
    flex: 0.6,
  },
  inputWrapper: {
    height: 45,
    width: '90%',
    backgroundColor: '#FAF9F9',
    borderRadius: 5,
    borderColor: '#E4E4E4',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 0,
  },
  loginButton: {
    height: 45,
    width: '90%',
    backgroundColor: BLUE_COLOR,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: iOSColors.white,
  },
  forgotWrapper: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  btnText: {
    ...human.footnoteObject,
    ...systemWeights.semibold,
    color: '#318DEE',
  },
  callOut: {
    ...human.footnoteObject,
    ...systemWeights.semibold,
    color: iOSColors.midGray,
  },
  orWrapper: {
    width: '90%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  orDivider: {
    height: 1,
    width: '100%',
    flex: 1,
    backgroundColor: iOSColors.lightGray,
  },
  orTextWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orText: {
    ...systemWeights.semibold,
    color: iOSColors.gray,
  },
  facebookButton: {
    flexDirection: 'row',
    height: 45,
    width: '90%',
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookLoginButtonText: {
    ...human.calloutObject,
    ...systemWeights.semibold,
    color: '#318DEE',
    marginLeft: 10,
  },
  noAccountWrapper: {
    height: 50,
    width: '100%',
    borderColor: '#ECECEC',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

class LoginScreen extends Component {
  state = { }

  _onLoginFBPress = async () => {
    const res = await LoginManager.logInWithReadPermissions(['public_profile']);
  }

  render() {
    return (
      <View style={styles.root}>
        <StatusBar barStyle='light-content' />
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          colors={COLORS_GRADIENTS}
          style={styles.header}
        >
          <Text style={styles.appName}>Danagram</Text>
        </LinearGradient>
        <View style={styles.content}>
          <View style={styles.section}>
            <View style={styles.inputWrapper}>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder="Email"
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder="Password"
              />
            </View>
            <Touchable style={styles.loginButton} feedback='opacity'>
              <Text style={styles.loginButtonText}>Login</Text>
            </Touchable>
            <View style={styles.forgotWrapper}>
              <Text style={styles.callOut}>Forgot your login details? </Text>
              <Touchable feedback="opacity">
                <Text style={styles.btnText}>Get help signing in</Text>
              </Touchable>
            </View>
          </View>
          <View style={styles.orWrapper}>
            <View style={styles.orDivider} />
            <View style={styles.orTextWrapper}>
              <Text style={styles.orText}>OR</Text>
            </View>
            <View style={styles.orDivider} />
          </View>
          <View style={[styles.section, styles.sectionBottom]}>
            <Touchable onPress={this._onLoginFBPress} style={styles.facebookButton} feedback='opacity'>
              <MaterialCommunityIcons size={30} name="facebook-box" color="#318DEE" />
              <Text style={styles.facebookLoginButtonText}>
                Continue with Facebook
              </Text>
            </Touchable>
          </View>
          <View style={styles.noAccountWrapper} >
            <Text style={styles.callOut}>Dont have an account? </Text>
            <Touchable feedback='opacity'><Text style={styles.btnText}>Sign up here</Text></Touchable>
          </View>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
