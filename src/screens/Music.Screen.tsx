import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useRef, useState } from "react";
import { Header } from "../components/Header";
import LikeVector from "../../assets/vectors/like.svg";
import BackVector from "../../assets/vectors/back.svg";
import ShuffleVector from "../../assets/vectors/shuffle.svg";
import PauseVector from "../../assets/vectors/pause.svg";
import RepeatVector from "../../assets/vectors/repeat.svg";
import SkipBackVector from "../../assets/vectors/skip_back.svg";
import SkipForwardVector from "../../assets/vectors/skip_forward.svg";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "../theme/colors";
import { songs } from "../mocks/songs.mock";
import { ProgressBar } from "../components/ProgressBar";

interface MusicScreenProps {
  navigation: any;
}

const HeaderRight = () => {
  return (
    <Pressable onPress={() => console.log("pressed")}>
      <LikeVector color={colors.gray} />
    </Pressable>
  );
};

export const MusicScreen: React.FC<MusicScreenProps> = ({ navigation }) => {
  const HeaderLeft = () => {
    return (
      <Pressable onPress={() => navigation.navigate("Home")}>
        <BackVector color={colors.white} />
      </Pressable>
    );
  };
  const audioPlayer = useRef<null>(null);

  const [play, setPlay] = useState<boolean>(false);

  const onController = () => {
    // do stuff
    // audioPlayer.current?.playAsync();
    // audioPlayer.current?.pauseAsync();

    if (play) {
      // audioPlayer.current?.pauseAsync();
    } else {
      // audioPlayer.current?.playAsync();
    }

    setPlay((state) => !state);
  };

  return (
    <View style={styles.root}>
      <Header
        left={<HeaderLeft />}
        right={<HeaderRight />}
        title="Ophelia by Steven"
      />
      <View style={styles.main}>
        <View style={styles.wrapper}>
          <Image
            resizeMode="cover"
            source={{
              uri: songs[0].url,
            }}
            style={styles.image}
          />
          <View style={styles.imageTexts}>
            <Text style={styles.title}>{songs[0].title}</Text>
            <Text style={styles.singer}>{songs[0].singer}</Text>
          </View>
          <View style={styles.controllers}>
            <ProgressBar time={185} currentTime={120} />
            <View style={styles.buttons}>
              <ShuffleVector color={colors.white} />
              <SkipBackVector color={colors.white} />
              <Pressable onPress={onController} style={styles.pause}>
                {play ? <PauseVector color={colors.white} /> : <LikeVector />}
              </Pressable>
              <SkipForwardVector color={colors.white} />
              <RepeatVector color={colors.white} />
            </View>
          </View>
          <View
            style={{
              height: 81,
              width: "100%",
              backgroundColor: "grey",
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 17,
    gap: 32,
  },
  pause: {
    // padding: 16,
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 99,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
  },
  wrapper: {
    gap: 28,
    flex: 1,
  },
  controllers: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  image: {
    height: 319,
    width: "100%",
    borderRadius: 36,
  },
  imageTexts: {
    gap: 7,
  },
  title: {
    fontFamily: "Nunito-Regular",
    fontSize: 24,
    color: colors.white,
    textAlign: "center",
  },
  singer: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    color: colors.gray,
    textAlign: "center",
  },
});
