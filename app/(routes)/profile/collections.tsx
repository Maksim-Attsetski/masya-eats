import React, { Fragment } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Button, Gap, LayoutWithAnimatedHeader } from '@/components';
import { CollectionItem, useCollection } from '@/widgets/collections';
import { router } from 'expo-router';

export default function Collections() {
  const { collections } = useCollection();

  const onPressAddCollection = () => {
    router.push('/(modals)/rest_save');
  };

  return (
    <LayoutWithAnimatedHeader
      title='Мои коллекции'
      right={
        <TouchableOpacity onPress={onPressAddCollection}>
          <AntDesign
            name='plus'
            size={24}
            color='black'
            style={{ marginTop: 12 }}
          />
        </TouchableOpacity>
      }
      onLeftPress={() => router.replace('/(routes)/profile')}
    >
      <View>
        {collections.length > 0 ? (
          <View>
            {collections.map((col) => (
              <Fragment key={col?.id}>
                <CollectionItem collection={col} />
                <Gap y={16} />
              </Fragment>
            ))}
          </View>
        ) : (
          <View>
            <Button btnProps={{ onPress: onPressAddCollection }}>
              Добавить
            </Button>
          </View>
        )}
      </View>
    </LayoutWithAnimatedHeader>
  );
}

const styles = StyleSheet.create({});
