import { View, Text } from 'react-native';
import React from 'react';
import { Avatar } from '../components/Avatar';

export const HomeScreen = () => {
  return (
    <View>
      <Avatar
        title="Xeyyam Kerimov"
        caption="Gold Member"
        url="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
      />
      <Text style={{ color: '#fff' }}>Home.Screen</Text>
    </View>
  );
};
