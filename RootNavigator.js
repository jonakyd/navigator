import React from 'react';
import { connect } from 'react-redux';
import { 
  HeaderBackButton,
  NavigationActions,
  StackNavigator,
  SwitchNavigator,
  TabNavigator,
} from 'react-navigation';
import SwiperNavigator from './SwiperNavigator/';
import {
  CoverScreen,
  DrawsScreen,
  LaddersScreen,
  Modal,
  NotificationScreen,
  SplashScreen,
  Stack1,
  Stack2,
  Tab1,
  Tab3,
} from './screens';
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
} from './screen-constants';

const HeaderLeft = connect()((props) => (
  <HeaderBackButton
    {...props}
    onPress={() => props.dispatch(NavigationActions.back())}
  />
));

export default SwitchNavigator({
  [SCREEN_SPLASH]: {
    screen: SplashScreen, 
  },
  [SCREEN_NOTIFICATION]: {
    screen: NotificationScreen,
  },
  [NAVIGATOR_MODAL]: {
    screen: StackNavigator({
      [NAVIGATOR_COVER]: {
        screen: SwiperNavigator({
          [SCREEN_COVER]: {
            screen: CoverScreen, 
          },
          [SCREEN_LADDERS]: {
            screen: LaddersScreen, 
          },
          [SCREEN_DRAWS]: {
            screen: DrawsScreen, 
          },
          [NAVIGATOR_TAB]: {
            screen: TabNavigator({
              [SCREEN_NEWS]: {
                screen: Tab1,
              },
              [NAVIGATOR_TEAM]: {
                screen: StackNavigator({
                  [SCREEN_TEAM]: {
                    screen: Stack1,
                  },
                  [SCREEN_PLAYER]: {
                    screen: Stack2,
                  },
                }),
              },
              [SCREEN_GAMEDAY]: {
                screen: Tab3,
              },
            }, {
              order: [
                SCREEN_NEWS,
                NAVIGATOR_TEAM,
                SCREEN_GAMEDAY,
              ],
              initialRouteName: SCREEN_NEWS,
            }),
          },
        }, {
          initialRouteName: SCREEN_COVER,
          order: [
            SCREEN_LADDERS,
            SCREEN_COVER,
            SCREEN_DRAWS,
            NAVIGATOR_TAB
          ],
          navigationOptions: {
            header: null,
          },
        }),
      },
      [SCREEN_MODAL]: {
        screen: Modal, 
      },
    }, {
      initialRouteName: NAVIGATOR_COVER,
      headerMode: 'screen',
    }),
  },
}, {
  initialRouteName: SCREEN_SPLASH,
});





