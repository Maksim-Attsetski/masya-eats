import React, { FC, memo, PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import { Colors } from '@/global';
import { AntDesign } from '@expo/vector-icons';

interface IProps {
  title: string;
  onPress: () => void;
}

const MenuBtn: FC<IProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <AntDesign name='right' size={16} color='black' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.cardBg,
    paddingVertical: 18,
    paddingLeft: 18,
    paddingRight: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    fontSize: 16,
  },
});

export default memo(MenuBtn);
