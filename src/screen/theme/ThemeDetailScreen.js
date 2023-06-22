import { useNavigation, useRoute } from "@react-navigation/native";
import React from 'react'
import {
  View, Text, Image, StyleSheet,
  Pressable, ScrollView
} from "react-native";
import Header from '../../components/Header/Header';

const ThemeDetailScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const { themeId, title, detailImg, contentTitle, content } = route.params;

  return (
    <View style={styles.back_container}>
      {/* 헤더 */}
      <Header>
        <Header.Title size={18} style={styles.Header}>{title}</Header.Title>
        <View></View>
      </Header>
      <ScrollView style={styles.container}>
        <View style = {styles.img}>
          <Image source={detailImg} />
        </View>
        <Text style ={styles.h1}>{contentTitle}</Text>
        <Text>{content}</Text>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  back_container: {
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 30,
    height: "100%",
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },

});

export default ThemeDetailScreen;