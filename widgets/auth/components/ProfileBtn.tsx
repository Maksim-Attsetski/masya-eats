import React, { FC, memo } from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

import { Colors } from '@/global';
import { useAuth } from '../useAuth';

const ProfileBtn: FC = () => {
  const { user } = useAuth();

  const onPressButton = () => {
    router.push(user ? '/(routes)/profile' : '/(auth)/auth-base');
  };

  return (
    <TouchableOpacity onPress={onPressButton} style={styles.user}>
      <AntDesign name='user' size={24} color='grey' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  user: {
    backgroundColor: Colors.light.cardBg,
    height: 40,
    width: 40,
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
});

export default memo(ProfileBtn);
