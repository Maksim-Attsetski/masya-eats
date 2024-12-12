import { Gap, Text } from '@/components';
import { Colors, ContainerPadding, SCREEN_WIDTH } from '@/global';
import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface IProps {
  imgVisible: boolean;
  data: { title?: string; data: any[] }[];
  onPress: (v: string) => void;
}

const RestOffersGenresList: FC<IProps> = ({ data, imgVisible, onPress }) => {
  return (
    <View
      style={[
        styles.genresContainer,
        { left: imgVisible ? 0 : -ContainerPadding },
      ]}
    >
      <Gap />
      <FlatList
        data={data}
        renderItem={({ item: genre }) => (
          <TouchableOpacity onPress={() => onPress(genre.title ?? '')}>
            <Text style={styles.genre}>{genre.title}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Gap x={20} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  genresContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: ContainerPadding,
    paddingBottom: 6,
    // height: GENRES_HEIGHT,
    width: SCREEN_WIDTH,
  },
  genre: {
    backgroundColor: Colors.light.cardBg,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
});

export default memo(RestOffersGenresList);
