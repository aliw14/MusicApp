import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import { Header } from '../components/Header';
import BackVector from '../../assets/vectors/back.svg';
import { colors } from '../theme/colors';
import { songs } from '../mocks/songs.mock';
import { Card } from '../components/Card';

const HeaderLeft = () => {
  return (
    <Pressable onPress={() => console.log('-->')}>
      <BackVector color={colors.white} />
    </Pressable>
  );
};

export const FavoriteScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Header left={<HeaderLeft />} />
      <View style={styles.info}>
        <Image style={styles.image} source={{ uri: songs[0].url }} />
        <View style={styles.texts}>
          <View style={styles.cardTitle}>
            <Text style={styles.singer}>{songs[0].singer}</Text>
            <Text style={styles.text}>{songs[0].gmail}</Text>
          </View>
          <Text style={[styles.text, styles.member]}>
            {songs[0].subscription ?? 'Not subscribed'}
          </Text>
          <Text style={styles.text}>{songs[0].description}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.singer}>Favourite Album</Text>
        <FlatList
          data={songs}
          renderItem={({ item: { url } }) => <Card size="l" url={url} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 9, marginTop: 24 }}
        />
      </View>

      <FlatList
        data={songs}
        scrollEnabled={false}
        renderItem={({ item: { url } }) => <Card size="l" url={url} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 9, marginTop: 24 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 17,
    gap: 32,
    flex: 1,
  },
  cardTitle: {
    gap: 2,
  },
  texts: {
    flex: 1,
  },
  member: {
    marginTop: 11,
    marginBottom: 13,
  },
  singer: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: colors.white,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.gray,
  },
  info: {
    flexDirection: 'row',
    gap: 15,
  },
  image: {
    width: 91,
    height: 100,
    borderRadius: 10,
  },
});
