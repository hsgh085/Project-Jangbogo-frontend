import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Pressable, StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";
import Header from "../components/Header/Header";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const AlarmScreen = () => {
  const isFocused = useIsFocused();
  const [alarmList, setAlarmList] = useState([]);
  useEffect(() => {
    setAlarmList([{ id: 0, content: "공동구매 인원이 모두 모였어요! 확인해보러갈까요?", time: "06/20 10:40" }]);
  }, [isFocused]);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Header>
          <Header.Title size={18}>알림</Header.Title>
          <View />
        </Header>
        {alarmList !== [] ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={alarmList}
            renderItem={({ item }) => {
              return (
                <Pressable style={s.container} onPress={() => {}}>
                  <Ionicons name="people-circle-outline" size={45} color={colors.green} />
                  <View style={s.textContainer}>
                    <Text style={s.contentText}>{item.content}</Text>
                    <Text style={s.timeText}>{item.time}</Text>
                  </View>
                </Pressable>
              );
            }}
          />
        ) : (
          <Text style={s.noAlarm}>📢 등록된 알람이 없습니다.</Text>
        )}
      </View>
    </>
  );
};

export default AlarmScreen;

const s = StyleSheet.create({
  noAlarm: {
    margin: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.greenLL,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  timeText: {
    marginTop:5,
    fontSize: 13,
    fontWeight: "500",
    color: colors.gray,
  },
  contentText: {
    fontSize: 16,
  },
});
