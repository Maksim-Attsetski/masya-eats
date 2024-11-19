import React, { FC, memo } from 'react';
import { IRestaurantOffer } from '../types';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '@/components';
import {
  Colors,
  ContainerPadding,
  SCREEN_WIDTH,
  supabaseBucketImg,
} from '@/global';

interface IProps {
  restOffer: IRestaurantOffer;
  restId: string; // name of the restaurant
}

const padding = 30;
const imhWidth = SCREEN_WIDTH / 2 - ContainerPadding * 2 - padding;

const RestOfferCard: FC<IProps> = ({ restOffer, restId }) => {
  return (
    <View style={styles.container}>
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
          {restOffer.price} Br
        </Text>
        <Text style={styles.name}>{restOffer.name}</Text>
        <Text style={styles.subText}>
          {restOffer.weight} {' • ' + (restOffer?.kbju?.kcal ?? '~') + ' ккал'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.cardBg,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 12,
    maxWidth: imhWidth + padding,
  },
  content: {
    paddingHorizontal: 8,
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
});

export default memo(RestOfferCard);
