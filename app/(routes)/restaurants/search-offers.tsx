import React, { FC, memo, useMemo, useState } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';
import { Gap, Input, Layout, MiniHeader, Text } from '@/components';
import { useLocalSearchParams } from 'expo-router';
import { RestOfferCard, useRestOffers } from '@/widgets/restaurant-offer';

const SearchOffers: FC = () => {
  const id = useLocalSearchParams().rest_name;

  const [query, setQuery] = useState<string>('');
  const { restOffers } = useRestOffers();

  const filteredOffers = useMemo(
    () => restOffers.filter((offer) => offer.name.includes(query)),
    [query, restOffers]
  );

  return (
    <Layout>
      <MiniHeader title='Поиск' />
      <Input
        title='Поиск'
        inputProps={{
          value: query,
          onChangeText: setQuery,
        }}
      />
      <Gap />
      <Text>Что будем искать?</Text>
      <Gap />
      <FlatList
        columnWrapperStyle={styles.offers}
        numColumns={2}
        ItemSeparatorComponent={() => <Gap x={12} />}
        data={filteredOffers}
        style={{ marginVertical: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RestOfferCard restId={id as string} restOffer={item} />
        )}
        ListEmptyComponent={() => <Text>Что-то ничего не нашлось</Text>}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  offers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
});

export default memo(SearchOffers);
