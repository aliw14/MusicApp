import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Header } from '../components/Header';
import RingVector from '../../assets/vectors/ring.svg';
import SearchVector from '../../assets/vectors/search.svg';
import { activeIndex, standardHitSlop } from '../theme/standard';
import { colors } from '../theme/colors';
import { Input } from '../components/Input';

export const HomeScreen = () => {
  const [value, setValue] = useState<string>('');

  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
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
        <Input
          placeholder="Search Music"
          placeholderTextColor={colors.gray}
          inputStyle={{ flexGrow: 0 }}
          value={value}
          icon={<SearchVector color={colors.lightGray} />}
          setValue={setValue}
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
  search: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 26,
    // lineHeight: 20,
    width: '50%',
    color: colors.white,
  },
});
