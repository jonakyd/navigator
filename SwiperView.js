import React from 'react';
import Rx from 'rxjs';
import { View, Text, Dimensions, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { generateComponent } from './utils';
import withCachedChildNavigation from './withCachedChildNavigation';

// Styles
const windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  horizontalScrollView: {
    height: windowSize.height,
    width: windowSize.width * 3,
  },
  verticalScrollView: {
    height: windowSize.height * 2,
    width: windowSize.width,
  },
});

class SwiperView extends React.PureComponent {
  horizontalScrollView;
  verticalScrollView;

  componentDidMount() {
    this.navigateToIndex(this.props.navigation.state.index);
  }

  componentDidUpdate() {
    this.navigateToIndex(this.props.navigation.state.index, true);
  }

  getContentOffsetForIndex = (index) =>
    (index === 3) ? {
      horizontal: {
        x: windowSize.width,
        y: 0, 
      },
      vertical: {
        x: 0,
        y: windowSize.height, 
      },
    } : {
      horizontal: {
        x: index * windowSize.width,
        y: 0, 
      },
      vertical: {
        x: 0,
        y: 0, 
      },
    };

  getIndexOfContentOffset = (contentOffset) =>
    (contentOffset.vertical.y === windowSize.height) ? 3 : (contentOffset.horizontal.x / windowSize.width);

  navigateToIndex = (index, animated) => {
    const contentOffset = this.getContentOffsetForIndex(index);

    this.horizontalScrollView.scrollTo({ ...contentOffset.horizontal, animated });
    if (animated) {
      setTimeout(() => {
        this.verticalScrollView.scrollTo({ ...contentOffset.vertical, animated });
      }, 250);
    }
    else {
      this.verticalScrollView.scrollTo({ ...contentOffset.vertical, animated });
    }
  };

  momentumScrollEnd$ = new Rx.Subject();

  momentumScrollEndSubscription = this.momentumScrollEnd$
    .scan((acc, contentOffset) => ({
      ...acc,
      ...contentOffset,
    }), {
      horizontal: {
        x: 0,
        y: 0,
      },
      vertical: {
        x: 0,
        y: 0,
      },
    })
    .debounceTime(300)
    .subscribe((contentOffset) => {
      const index = this.getIndexOfContentOffset(contentOffset);

      this.props.navigation.navigate(this.props.order[index]);
    });
  onHorizontalMomentumScrollEnd = (event) => {
    this.momentumScrollEnd$.next({ horizontal: event.nativeEvent.contentOffset });
  };
  onVerticalMomentumScrollEnd = (event) => {
    this.momentumScrollEnd$.next({ vertical: event.nativeEvent.contentOffset });
  };

  componentWillUnmount() {
    this.momentumScrollEndSubscription.unsubscribe();
  }

  render() {
    const { navigation, order, router } = this.props;
    const { state } = navigation;
    const BottomMiddle = router.getComponentForRouteName(order[3]);
    const TopLeft = router.getComponentForRouteName(order[0]);
    const TopMiddle = router.getComponentForRouteName(order[1]);
    const TopRight = router.getComponentForRouteName(order[2]);
    const shouldEnableHorizontalScroll = state.index !== 3;

    return (
      <SafeAreaView>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.horizontalScrollView}
          directionalLockEnabled={true}
          horizontal={true}
          onMomentumScrollEnd={this.onHorizontalMomentumScrollEnd}
          pagingEnabled={true}
          ref={(scrollView) => this.horizontalScrollView = scrollView}
          scrollEnabled={shouldEnableHorizontalScroll}
          showsHorizontalScrollIndicator={false}
        >
          <TopLeft navigation={this.props.childNavigationProps[state.routes[0].key]}/>
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.verticalScrollView}
            directionalLockEnabled={true}
            onMomentumScrollEnd={this.onVerticalMomentumScrollEnd}
            pagingEnabled={true}
            ref={(scrollView) => this.verticalScrollView = scrollView}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <TopMiddle navigation={this.props.childNavigationProps[state.routes[1].key]} />
            <BottomMiddle navigation={this.props.childNavigationProps[state.routes[3].key]} />
          </ScrollView>
          <TopRight navigation={this.props.childNavigationProps[state.routes[2].key]} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withCachedChildNavigation(SwiperView);