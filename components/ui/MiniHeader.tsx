import React, { FC, memo, ReactNode, useRef } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Flex, Gap, Text } from '@/components';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface IProps {
  title: string;
  right?: ReactNode;
}

const MiniHeader: FC<IProps> = ({ title, right }) => {
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
        <Gap />
        <Text title>{title}</Text>
        <Gap />
        {right ? right : <Gap y={30} />}
      </Flex>
    </>
  );
};

export default memo(MiniHeader);
