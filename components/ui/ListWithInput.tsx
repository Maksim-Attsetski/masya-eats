import React, {
  FC,
  Fragment,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

import RefreshInput from './RefreshInput';
import { useDebounce } from '@/hooks';
import Input from './Input';
import Gap from './Gap';
import Card from './Card';
import Empty from './Empty';

const { width } = Dimensions.get('window');

const offsetY = width / 2;
const inputSize = 48;

interface IProps {
  onSearch: (query: string) => Promise<any>;
  data: any[];
  renderItem: (item: any, index: number) => ReactNode;
  limitForInput?: number;
  inputPlaceholder?: string;
  loading?: boolean;
  onRefresh?: any;
  emptyText?: string;
}

const ListWithInput: FC<IProps> = ({
  onSearch,
  data,
  renderItem,
  limitForInput = 3,
  inputPlaceholder = '',
  onRefresh = () => {},
  loading = false,
  emptyText = '',
}) => {
  const scrollY = useSharedValue(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const containerRef = useRef<Animated.ScrollView>(null);
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, 500);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isNeedInput = data.length > limitForInput;

  const onInputFocus = (): void => {
    setIsFocused(true);
  };
  const onInputBlur = (): void => {
    setIsFocused(false);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
    onMomentumEnd: (event) => {
      if (event.contentOffset.y < offsetY) {
        runOnJS(setLastScrollY)(event.contentOffset.y);
      }
    },
  });

  const scrollToTop = () => {
    containerRef?.current?.scrollTo?.({ animated: true, x: 0, y: offsetY });
  };

  const onScrollEnd = (e: any) => {
    const newValue = e.nativeEvent.contentOffset.y;
    if (containerRef?.current && newValue < offsetY) {
      if (newValue < inputSize * 1.3) {
        onRefresh();
      }
    }
  };

  useEffect(() => {
    isNeedInput && scrollToTop();
  }, [lastScrollY, isNeedInput]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <>
      {isNeedInput && !isFocused ? (
        <RefreshInput
          placeHolder={query.length > 0 ? query : inputPlaceholder}
          scrollY={scrollY}
          inputSize={inputSize}
          offsetY={width}
          onFocus={onInputFocus}
        />
      ) : (
        <View style={{ position: 'relative' }}>
          <Input
            inputProps={{
              placeholder: inputPlaceholder,
              onChangeText: setQuery,
              value: query,
              onBlur: onInputBlur,
              autoFocus: isFocused,
            }}
          />
          <TouchableOpacity
            style={{ position: 'absolute', top: '45%', right: 15 }}
            onPress={onRefresh}
          >
            <AntDesign name='search1' size={24} color='black' />
          </TouchableOpacity>
        </View>
      )}
      <Gap />
      <Animated.ScrollView
        onScroll={scrollHandler}
        onScrollEndDrag={onScrollEnd}
        ref={containerRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {isNeedInput && !loading && (
          <View
            onLayout={scrollToTop}
            style={{ width: '100%', height: offsetY }}
          />
        )}
        {loading ? (
          <>
            <Card style={{ maxHeight: 200 }} loading />
            <Gap />
            <Card style={{ maxHeight: 200 }} loading />
            <Gap />
            <Card style={{ maxHeight: 200 }} loading />
            <Gap />
            <Card style={{ maxHeight: 200 }} loading />
          </>
        ) : (
          <View onTouchStart={onInputBlur}>
            {data.length > 0 ? (
              data.map((item, inx) => (
                <Fragment key={item?.id ?? inx}>
                  <Gap />
                  {renderItem(item, inx)}
                  <Gap />
                </Fragment>
              ))
            ) : (
              <Empty>{emptyText}</Empty>
            )}
          </View>
        )}
      </Animated.ScrollView>
    </>
  );
};

export default memo(ListWithInput);
