import React from 'react';
import { createNavigator, TabRouter } from 'react-navigation';
import { generateComponent } from './utils';
import SwiperView from './SwiperView/';

export default (routeConfigs, config = {}) => {
  // // Validate initialIndex
  // if (!(
  //   typeof props.initialIndex === 'number' &&
  //   props.initialIndex > -1 &&
  //   props.initialIndex < 4
  // )) {
  //   throw new Error('initialIndex format incorrect');
  // }

  // // Validate order 
  // if (!(
  //   Array.isArray(props.order) && 
  //   props.order.length === 4 &&
  //   props.order.every((routeName) => (typeof routeName === 'string'))
  // )) {
  //   throw new Error('order format incorrect');
  // }
  const router = TabRouter(routeConfigs, config);

  return createNavigator(router)((props) => (
    <SwiperView {...props} order={config.order} />
  ));
};
