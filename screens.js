import { Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { generateComponent } from './utils';
import {
  NAVIGATOR_COVER,
  NAVIGATOR_MODAL,
  NAVIGATOR_TAB,
  NAVIGATOR_TEAM,
  SCREEN_COVER,
  SCREEN_DRAWS,
  SCREEN_GAMEDAY,
  SCREEN_LADDERS,
  SCREEN_MODAL,
  SCREEN_NEWS,
  SCREEN_NOTIFICATION,
  SCREEN_PLAYER,
  SCREEN_SPLASH,
  SCREEN_TEAM,
} from './screen-constants/';

export const windowSize = Dimensions.get('window');

export const SplashScreen = generateComponent(
  'Splash',
  NavigationActions.navigate({
    routeName: SCREEN_NOTIFICATION,
  }),
);
export const NotificationScreen = generateComponent(
  'Notification', 
  NavigationActions.navigate({
    routeName: NAVIGATOR_MODAL,
  }),
);
export const CoverScreen = generateComponent(
  'Cover',
  NavigationActions.navigate({
    routeName: SCREEN_LADDERS,
  }),
  {
    backgroundColor: '#ffff00',
    width: windowSize.width,
    height: windowSize.height,
  },
);
export const LaddersScreen = generateComponent(
  'Ladders',
  NavigationActions.navigate({
    routeName: SCREEN_DRAWS, 
  }),
  {
    backgroundColor: '#ff00ff',
    width: windowSize.width,
    height: windowSize.height,
  },
);
export const DrawsScreen = generateComponent(
  'Draws',
  NavigationActions.navigate({
    routeName: NAVIGATOR_TAB 
  }),
  {
    backgroundColor: '#00ffff',
    width: windowSize.width,
    height: windowSize.height,
  },
);
export const Modal = generateComponent(
  'Modal',
  NavigationActions.navigate({
    routeName: SCREEN_MODAL
  }),
); 
export const Tab1 = generateComponent(
  'Tab1',
  NavigationActions.navigate({
    routeName: NAVIGATOR_TEAM,
  }),
);
export const Tab3 = generateComponent(
  'Tab3',
  NavigationActions.navigate({
    routeName: SCREEN_MODAL
  }),
);
export const Stack1 = generateComponent(
  'Stack1',
  NavigationActions.navigate({
    routeName: SCREEN_PLAYER,
  }),
);
export const Stack2 = generateComponent(
  'Stack2',
  NavigationActions.navigate({
    routeName: SCREEN_PLAYER,
  }),
);
