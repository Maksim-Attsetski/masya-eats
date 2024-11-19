import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Button, Flex, Gap, Layout, MiniHeader, Text } from '@/components';
import { useAuth } from '@/widgets';
import { useTheme } from '@/hooks';

export default function ProfileScreen() {
  const { user, onLogout } = useAuth();
  const { isDark, onChangeTheme } = useTheme();

  return (
    <Layout>
      <MiniHeader title={user?.user_metadata?.name} />
      <Text style={styles.themeTitle}>Тема</Text>
      <Gap y={20} />

      <Flex>
        <Button
          full
          type={isDark ? 'common' : 'primary'}
          btnProps={{
            onPress: () => onChangeTheme('light'),
          }}
          size='small'
        >
          Светлая
        </Button>
        <Button
          full
          size='small'
          type={isDark ? 'primary' : 'common'}
          btnProps={{
            onPress: () => onChangeTheme('dark'),
          }}
        >
          Тёмная
        </Button>
      </Flex>

      <Gap y={20} />
      <View style={styles.divider} />
      <Gap y={20} />

      <Text>Имя: {user?.user_metadata?.name}</Text>
      <Text>E-mail: {user?.email}</Text>

      <Gap y={20} />

      <Flex toDown>
        <Button full type='secondary' btnProps={{ onPress: onLogout }}>
          Выйти
        </Button>
      </Flex>
    </Layout>
  );
}

const styles = StyleSheet.create({
  themeTitle: { textAlign: 'center' },
  divider: {
    width: '70%',
    height: 1,
    backgroundColor: 'rgba(35,35,35,0.5)',
    alignSelf: 'center',
  },
});
