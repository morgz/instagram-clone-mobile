import { Navigation } from 'react-native-navigation';

import FeedScreen from './FeedsScreen';
import ExploreScreen from './ExploreScreen';
import LoginScreen from './LoginScreen';
import CreatePhotoScreen from './CreatePhotoScreen';
import CaptionScreen from './CaptionScreen';
import CreateCommentScreen from './CreateCommentScreen';

import WithProvider from '../components/WithProvider';
import { screens } from '../utils/constants';

export const registerScreens = () => {
  Navigation.registerComponent(screens.FeedScreen, () =>
    WithProvider(FeedScreen)
  );
  Navigation.registerComponent(screens.ExploreScreen, () =>
    WithProvider(ExploreScreen)
  );
  Navigation.registerComponent(screens.LoginScreen, () =>
    WithProvider(LoginScreen)
  );
  Navigation.registerComponent(screens.CreatePhotoScreen, () =>
    WithProvider(CreatePhotoScreen)
  );
  Navigation.registerComponent(screens.CaptionScreen, () =>
    WithProvider(CaptionScreen)
  );
  Navigation.registerComponent(screens.CreateCommentScreen, () =>
    WithProvider(CreateCommentScreen)
  );
}
;
