import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Avatar } from "../components/Avatar";
import { Header } from "../components/Header";
import RingVector from "../../assets/vectors/ring.svg";
import SearchVector from "../../assets/vectors/search.svg";
import { activeIndex, standardHitSlop } from "../theme/standard";
import { colors } from "../theme/colors";
import { Input } from "../components/Input";
import { Card, ICard } from "../components/Card";
import fetchSongs from "../api/songsFromApi";
import { FlashList } from "@shopify/flash-list";
import { CommonStyles } from "../theme/common";
import { Alert } from "react-native";

const showAlert = () =>
  Alert.alert("Notifications Alert", "Notifications do not work yet");

export const HomeScreen = () => {
  const [value, setValue] = useState<string>("");
  const [songs, setSongs] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const songs = await fetchSongs();
      setSongs(songs);

      setLoading(false);
    } catch (error) {
      console.error("Error ", error);
      setLoading(false);
    }
  };

  const renderCards = ({ item, index }: { item: any; index: number }) => {
    return (
      <Card
        key={index}
        title={item.title}
        url={item.artist.picture_big}
        onPress={fetchSongs}
      />
    );
  };

  const renderVerticalCards = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    return (
      <Card
        size="s"
        key={index}
        horizontal
        {...item}
        url={item.artist.picture_big}
      />
    );
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
              title="Ali Mammadov"
              caption="Gold Member"
              // url="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
            />
          }
          right={
            <TouchableOpacity
              activeOpacity={activeIndex}
              hitSlop={standardHitSlop}
              onPress={showAlert}
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
        <View style={[CommonStyles.flex, { gap: 16 }]}>
          {loading ? (
            <Text style={[styles.title, styles.cardHeader]}>Loading...</Text>
          ) : (
            <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
              Recently Played
            </Text>
          )}

          <FlashList
            data={songs}
            horizontal
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={50}
            ItemSeparatorComponent={() => <View style={{ width: 17 }} />}
            renderItem={renderCards}
          />
        </View>

        <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
          Recently Played
        </Text>
        <FlashList
          data={songs}
          removeClippedSubviews
          contentContainerStyle={styles.cards}
          scrollEnabled={false}
          estimatedItemSize={50}
          ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
          renderItem={renderVerticalCards}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.dark,
    paddingHorizontal: 20,
    flex: 1,
    minHeight: "100%",
    paddingTop: 46,
  },
  scrollView: {
    flex: 1,
  },
  search: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 26,
    width: "50%",
    color: colors.white,
  },
  cards: {
    paddingTop: 18,
  },
  cardHeader: {
    width: undefined,
    fontSize: 22,
    marginTop: 44,
  },
});
