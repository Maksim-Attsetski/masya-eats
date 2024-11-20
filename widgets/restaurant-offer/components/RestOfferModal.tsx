import React, {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import { Image, StyleSheet, View } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import {
  Colors,
  ContainerPadding,
  SCREEN_WIDTH,
  supabaseBucketImg,
} from '@/global';
import { Button, Flex, Gap, Text } from '@/components';
import { IRestaurantOffer } from '@/widgets/restaurant-offer';

interface IProps {
  activeOffer: IRestaurantOffer | null;
  setActiveOffer: Dispatch<SetStateAction<IRestaurantOffer | null>>;
  public_id: string;
}

const RestOfferModal: FC<IProps> = ({
  activeOffer,
  setActiveOffer,
  public_id,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (activeOffer) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [activeOffer]);

  return (
    <BottomSheet
      index={-1}
      onChange={(inx) => inx === -1 && setActiveOffer(null)}
      ref={bottomSheetRef}
      enableDynamicSizing
      enablePanDownToClose
    >
      <BottomSheetView
        style={{ paddingHorizontal: ContainerPadding, maxWidth: SCREEN_WIDTH }}
      >
        <Flex justify='center'>
          <Image
            source={{
              uri: `${supabaseBucketImg}restaurants-offers/${public_id}/${activeOffer?.public_id}.${activeOffer?.preview}`,
            }}
            height={SCREEN_WIDTH / 2}
            width={SCREEN_WIDTH / 2 - ContainerPadding}
          />
        </Flex>
        <Gap y={20} />
        <Text>{activeOffer?.description}</Text>
        <Gap y={20} />
        {activeOffer?.kbju?.kcal && (
          <View>
            <Text style={styles.subText}>На 100 гр</Text>
            <Gap />
            <Flex gap={16}>
              <View>
                <Text title>{activeOffer?.kbju?.kcal}</Text>
                <Text style={styles.text}>ккал</Text>
              </View>
              <View>
                <Text title>{activeOffer?.kbju?.protein}</Text>
                <Text style={styles.text}>белков</Text>
              </View>
              <View>
                <Text title>{activeOffer?.kbju?.fat}</Text>
                <Text style={styles.text}>жира</Text>
              </View>
              <View>
                <Text title>{activeOffer?.kbju?.carbohydraties}</Text>
                <Text style={styles.text}>углеводов</Text>
              </View>
            </Flex>
          </View>
        )}
        <Gap />
        <Flex justify='space-between'>
          <Text title>
            {activeOffer?.name}{' '}
            <Text style={styles.subText}>{activeOffer?.weight}</Text>
          </Text>
          <Text title>{activeOffer?.price} Br</Text>
        </Flex>
        <Gap y={20} />
        <Flex>
          <Flex>
            <Button>-</Button>
            <Text title>1</Text>
            <Button>+</Button>
          </Flex>
          <Button full type='primary'>
            Добавить
          </Button>
        </Flex>
        <Gap y={20} />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  subText: {
    color: 'grey',
    fontSize: 14,
  },
});

export default memo(RestOfferModal);
