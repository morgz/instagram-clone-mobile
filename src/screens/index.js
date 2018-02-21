import { Navigation } from 'react-native-navigation';

import FeedScreen from './FeedsScreen';
import ExploreScreen from './ExploreScreen';
import LoginScreen from './LoginScreen';

import WithProvider from '../components/WithProvider';

export const registerScreens = () => {
  Navigation.registerComponent('InstagramClone.FeedScreen', () =>
    WithProvider(FeedScreen)
  );
  Navigation.registerComponent('InstagramClone.ExploreScreen', () =>
    WithProvider(ExploreScreen)
  );
  Navigation.registerComponent('InstagramClone.LoginScreen', () =>
    WithProvider(LoginScreen)
  );
}
;
