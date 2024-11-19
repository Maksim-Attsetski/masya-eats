import React, { FC, memo, useRef } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Flex, Gap, Text } from '@/components';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface IProps {
  title: string;
}

const MiniHeader: FC<IProps> = ({ title }) => {
  return (
    <>
      <Gap />
      <Flex justify='space-between'>
        <TouchableOpacity
          onPress={() =>
            router?.canGoBack() ? router.back() : router.push('/(routes)/index')
          }
        >
          <Ionicons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text title>{title}</Text>
        <Gap y={30} />
      </Flex>
    </>
  );
};

export default memo(MiniHeader);
