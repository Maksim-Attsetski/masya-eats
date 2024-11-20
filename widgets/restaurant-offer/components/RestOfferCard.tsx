import React, { Dispatch, FC, memo, SetStateAction, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { IRestaurantOffer } from '../types';
import { Button, Flex, Text } from '@/components';
import {
  Colors,
  ContainerPadding,
  SCREEN_WIDTH,
  supabaseBucketImg,
} from '@/global';
import { useBin } from '@/widgets/bin';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IProps {
  restOffer: IRestaurantOffer;
  restId: string; // name of the restaurant
  setActiveOffer: Dispatch<SetStateAction<IRestaurantOffer | null>>;
}

const padding = 12;
const imhWidth = SCREEN_WIDTH / 2 - ContainerPadding * 2 - padding;

const RestOfferCard: FC<IProps> = ({ restOffer, restId, setActiveOffer }) => {
  const { bin, onBinItemsUpdate, onRemoveItemsFromBin, binLoading } = useBin();

  const itemInBin = useMemo(() => {
    return bin.items.find((elem) => elem.offer_id === restOffer.id);
  }, [bin, restOffer?.id]);

  const onPressAddButton = async () => {
    if (itemInBin) {
      await onBinItemsUpdate({
        offer_id: itemInBin?.offer_id,
        count: itemInBin?.count + 1,
      });
    } else {
      await onBinItemsUpdate({ offer_id: restOffer?.id, count: 1 });
    }
  };
  const onPressDeleteButton = async () => {
    if (!itemInBin) return;

    if (itemInBin && itemInBin?.count - 1 > 0) {
      await onBinItemsUpdate({
        offer_id: itemInBin?.offer_id,
        count: itemInBin?.count - 1,
      });
    } else {
      await onRemoveItemsFromBin(restOffer?.id);
    }
  };

  return (
    <>
      <TouchableOpacity
        disabled={binLoading}
        onPress={() => {
          setActiveOffer(restOffer);
        }}
        style={styles.container}
      >
        <Image
          source={{
            uri: `${supabaseBucketImg}restaurants-offers/${restId}/${restOffer.public_id}.${restOffer.preview}`,
          }}
          height={imhWidth}
          width={imhWidth}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.price} title>
            {restOffer.price} Br {itemInBin?.count ?? 0}
          </Text>
          <Text style={styles.name}>{restOffer.name}</Text>
          <Text style={styles.subText}>
            {restOffer.weight}{' '}
            {' • ' + (restOffer?.kbju?.kcal ?? '~') + ' ккал'}
          </Text>
        </View>
        <Flex toDown>
          <Flex style={styles.buttonGroup}>
            {(itemInBin?.count ?? 0) >= 1 ? (
              <Button
                full
                size='small'
                btnProps={{
                  onPress: onPressDeleteButton,
                  style: styles.button,
                }}
              >
                <MaterialCommunityIcons name='minus' size={24} color='black' />
              </Button>
            ) : (
              <View />
            )}
            {itemInBin?.offer_id ? (
              <Text title>{itemInBin?.count}</Text>
            ) : (
              <Button
                btnProps={{
                  onPress: onPressAddButton,
                  style: styles.button,
                }}
                full
                size='small'
              >
                <Text center>+ Добавить</Text>
              </Button>
            )}
            {itemInBin?.count ? (
              <Button
                full
                size='small'
                btnProps={{ onPress: onPressAddButton, style: styles.button }}
              >
                <MaterialCommunityIcons name='plus' size={24} color='black' />
              </Button>
            ) : (
              <View />
            )}
          </Flex>
        </Flex>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.cardBg,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    maxWidth: imhWidth + padding,
  },
  content: {
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  image: {
    borderRadius: 20,
  },
  price: {
    marginTop: 12,
    fontSize: 18,
  },
  name: {
    marginVertical: 2,
    fontSize: 14,
  },
  subText: {
    color: 'grey',
    fontSize: 16,
  },
  buttonGroup: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginBottom: -12,
  },
  button: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
  },
});

export default memo(RestOfferCard);
