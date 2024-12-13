import React, { FC, memo, PropsWithChildren } from 'react';
import Layout from './Layout';
import AnimatedHeader from './AnimatedHeader';
import { ScrollView } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

interface IProps extends PropsWithChildren {
  title: string;
}

const LayoutWithAnimatedHeader: FC<IProps> = ({ children, title }) => {
  const scrollY = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Layout>
      <AnimatedHeader scrollY={scrollY} title={title} />
      <Animated.ScrollView
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>
    </Layout>
  );
};

export default memo(LayoutWithAnimatedHeader);
