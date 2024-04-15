import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import BackVector from "../../assets/vectors/back.svg";
import { colors } from "../theme/colors";
import { songs } from "../mocks/songs.mock";
import { Card } from "../components/Card";
import { CommonStyles } from "../theme/common";
import { screenWidth } from "../theme/consts.styles";
import { FlashList } from "@shopify/flash-list";
import fetchSongs from "../api/songsFromApi";

interface MusicScreenProps {
  navigation: any;
}

export const FavoriteScreen: React.FC<MusicScreenProps> = ({ navigation }) => {
  const HeaderLeft = () => {
    return (
      <Pressable onPress={() => navigation.navigate("HomeScreen")}>
        <BackVector color={colors.white} />
      </Pressable>
    );
  };

  const [songs, setSongs] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const songsData = await fetchSongs();
      setSongs(songsData);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const renderItems = ({ item }: { item: any }) => {
    return (
      <Card
        size="l"
        url={item.artist.picture_big}
        style={{ width: "100%" }}
        imageStyle={{ width: cardWidth }}
      />
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Header left={<HeaderLeft />} />
      <View style={styles.info}>
        {songs && songs[0] && songs[0].artist && (
          <Image
            style={styles.image}
            source={{ uri: songs[0].artist.picture_big }}
          />
        )}
        <View style={CommonStyles.flex}>
          <View style={styles.cardTitle}>
            <Text style={styles.singer}>Traviss Scott</Text>
            <Text style={styles.text}>Travisrandom@gmail.com</Text>
          </View>
          <Text style={[styles.text, styles.member]}>Gold Member</Text>
          <Text style={styles.text}>Subscribed</Text>
        </View>
      </View>

      <View style={{ flex: 1, width: "100%" }}>
        <Text style={styles.singer}>Favourite Album</Text>
        <FlashList
          estimatedItemSize={50}
          data={songs}
          renderItem={({ item: { artist } }: { item: any }) => (
            <Card size="l" url={artist.picture_big} />
          )}
          horizontal
          ItemSeparatorComponent={() => (
            <View style={{ width: 9, height: "100%" }} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={CommonStyles.flex}>
        <Text style={styles.singer}>Favourite Music</Text>
        <FlashList
          data={songs}
          estimatedItemSize={50}
          scrollEnabled={false}
          renderItem={renderItems}
          numColumns={3}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    </ScrollView>
  );
};

const screenPaddingSize = 17 * 2;
const cardWidth = Math.floor((screenWidth - screenPaddingSize - 18) / 3);

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.dark,
    paddingHorizontal: 17,
    gap: 32,
    minHeight: "100%",
    minWidth: "100%",
    paddingBottom: 40,
    paddingTop: 46,
  },
  cardTitle: {
    gap: 2,
  },
  member: {
    marginTop: 11,
    marginBottom: 13,
  },
  singer: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    color: colors.white,
    marginBottom: 24,
  },
  text: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    color: colors.gray,
  },
  info: {
    flexDirection: "row",
    gap: 15,
  },
  image: {
    width: 91,
    height: 100,
    borderRadius: 10,
  },
  singerContainer: {},
});
