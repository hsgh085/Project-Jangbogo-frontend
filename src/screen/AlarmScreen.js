import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";
import Header from "../components/Header/Header";

const AlarmScreen = () => {
  const [alarmList, setAlarmList] = useState([]);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Header>
          <Header.Title size={18}>알림</Header.Title>
          <View />
        </Header>
        {alarmList===[]? (<View></View>):(<Text style={s.noAlarm}>📢 등록된 알람이 없습니다.</Text>)}
      </View>
    </>
  );
};

export default AlarmScreen;

const s = StyleSheet.create({
    noAlarm:{
        margin: 20,
    }
});