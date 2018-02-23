import { AsyncStorage } from 'react-native';

import { iconsLoaded } from '../utils/themes';
import { startLogin, startMainApp } from '../Nav';
import { authToken } from '../utils/constants';

export default async function appInitialized() {
  await iconsLoaded();

  await AsyncStorage.removeItem(authToken);
  const token = await AsyncStorage.getItem(authToken);

  if (!token) {
    startLogin();
  } else {
    startMainApp();
  }
}
