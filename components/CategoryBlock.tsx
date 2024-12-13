import React, { FC, memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './ui';
import { router } from 'expo-router';
import { ContainerPadding, SCREEN_WIDTH, supabaseBucketImg } from '@/global';
import { UnknownInputParams } from 'expo-router';

interface IProps {
  size?: number;
  url: string;
  route: string;
  text: string;
  params?: UnknownInputParams;
}

const BTN_SIZE = SCREEN_WIDTH / 2 - ContainerPadding * 2;

const CategoryBlock: FC<IProps> = ({ size = 0, route, text, url, params }) => {
  return (
    <TouchableOpacity
      style={[styles.button]}
      // @ts-ignore
      onPress={() => router.push({ pathname: `/(routes)/${route}/`, params })}
    >
      <Image
        source={{ uri: supabaseBucketImg + `avatars/${url}.png` }}
        style={
          styles[
            size === 0
              ? 'smallButtonImage'
              : size === 1
              ? 'mediumButtonImage'
              : 'largeButtonImage'
          ]
        }
      />
      <Text center style={styles.btnText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0.9 }],
  },
  btnText: {
    fontSize: 12,
    marginTop: 6,
  },
  largeButtonImage: {
    height: BTN_SIZE,
    width: BTN_SIZE,
    objectFit: 'contain',
  },
  mediumButtonImage: {
    height: BTN_SIZE / 2 - ContainerPadding,
    width: BTN_SIZE,
  },
  smallButtonImage: {
    height: BTN_SIZE / 2.2 - ContainerPadding,
    width: BTN_SIZE / 2.2 - ContainerPadding,
    borderRadius: 4,
    objectFit: 'contain',
  },
});

export default memo(CategoryBlock);
