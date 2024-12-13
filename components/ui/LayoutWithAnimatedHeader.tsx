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
  loading?: boolean;
}

const LayoutWithAnimatedHeader: FC<IProps> = ({ children, title, loading }) => {
  const scrollY = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Layout loading={loading}>
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
