import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Header } from '../components/Header';
import RingVector from '../../assets/vectors/ring.svg';
import SearchVector from '../../assets/vectors/search.svg';
import { activeIndex, standardHitSlop } from '../theme/standard';
import { colors } from '../theme/colors';
import { Input } from '../components/Input';
import { Card, ICard } from '../components/Card';
import { songs } from '../mocks/songs.mock';

export const HomeScreen = () => {
  const [value, setValue] = useState<string>('');

  const renderCards = ({ item, index }: { item: ICard; index: number }) => {
    return <Card key={index} title={item.title} url={item.url} />;
  };

  const renderVerticalCards = ({
    item,
    index,
  }: {
    item: ICard;
    index: number;
  }) => {
    return <Card size="s" key={index} horizontal {...item} />;
  };

  return (
    <ScrollView
      indicatorStyle="white"
      style={styles.scrollView}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.root}>
        <Header
          left={
            <Avatar
              title="Xeyyam Kerimov"
              caption="Gold Member"
              url="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
            />
          }
          right={
            <TouchableOpacity
              activeOpacity={activeIndex}
              hitSlop={standardHitSlop}
              onPress={() => console.log('pressed')}
            >
              <RingVector color={colors.gray} />
            </TouchableOpacity>
          }
        />

        <View style={styles.search}>
          <Text numberOfLines={2} style={styles.title}>
            Listen The Latest Music
          </Text>
          <Input
            placeholder="Search Music"
            placeholderTextColor={colors.gray}
            inputStyle={{ flexGrow: 0 }}
            value={value}
            icon={<SearchVector color={colors.lightGray} />}
            setValue={setValue}
          />
        </View>
        <View>
          <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
            Recently Played
          </Text>
          {/* <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ marginTop: 16 }}
            contentContainerStyle={{ gap: 16 }}
          >
            {songs.map(renderCards)}
          </ScrollView> */}

          <FlatList
            data={songs}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 16 }}
            contentContainerStyle={{ gap: 16 }}
            // renderItem={({ item }) => (
            //   <Card title={item.title} url={item.url} />
            // )}
            renderItem={renderCards}
          />
        </View>

        <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
          Recently Played
        </Text>
        {/* <View style={styles.cards}>{songs.map(renderVerticalCards)}</View> */}
        <FlatList
          data={songs}
          removeClippedSubviews
          contentContainerStyle={styles.cards}
          scrollEnabled={false}
          renderItem={renderVerticalCards}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  search: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 26,
    width: '50%',
    color: colors.white,
  },
  cards: {
    marginTop: 18,
    gap: 17,
  },
  cardHeader: {
    width: undefined,
    fontSize: 22,
    marginTop: 44,
  },
});
