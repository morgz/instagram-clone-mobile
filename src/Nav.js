import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { iconsMap } from './utils/themes';
import appInitialized from './utils/appInitialized';

registerScreens();

export function startLogin() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'InstagramClone.LoginScreen',
      navigatorStyle: {
        navBarHidden: true,
      },
    },
  });
}

export function startMainApp() {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Feed',
        screen: 'InstagramClone.FeedScreen',
        title: 'Instagram',
        icon: iconsMap.home,
      },
      {
        label: 'Explore',
        screen: 'InstagramClone.ExploreScreen',
        title: 'Explore',
        icon: iconsMap.search,
      },
    ],
  });
}

export function init() {
  appInitialized();
}
