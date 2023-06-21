import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, View, Pressable, StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";
import Header from "../components/Header/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ROOT_API } from "../constants/api";
import { TokenContext } from "../contexts/TokenContext";
import moment from "moment";

const AlarmScreen = () => {
  const [token, setToken] = useContext(TokenContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [alarmList, setAlarmList] = useState([]);
  const handleClickAlram = (id, category) => {
    if (category === 0) {
      navigation.navigate("GroupBuyingStack", { screen: "GBDetail", params: { id: id, type: "alarm" } });
    }
  };
  useEffect(() => {
    fetch(`${ROOT_API}/notice/noticelist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAlarmList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isFocused]);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white, paddingBottom: 110 }}>
        <Header>
          <Header.Title size={18}>알림</Header.Title>
          <View />
        </Header>
        {alarmList.length !== 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={alarmList}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={[s.container, { backgroundColor: item.category === 0 ? colors.greenLL : colors.white }]}
                  onPress={() => {
                    handleClickAlram(item.type, item.category);
                  }}
                >
                  <Ionicons name="people-circle-outline" size={45} color={colors.green} />
                  <View style={s.textContainer}>
                    <Text style={s.contentText}>{item.content}</Text>
                    {item.category === 0 && <Text style={s.contentText}>글을 확인해보러 갈까요?</Text>}
                    <Text style={s.timeText}>{moment(item.createdAt).format("MM/DD HH:mm")}</Text>
                  </View>
                </Pressable>
              );
            }}
          />
        ) : (
          <View style={s.noAlarmContainer}>
            <Text style={s.noAlarm}>📢 등록된 알람이 없습니다.</Text>
          </View>
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
  noAlarmContainer: {
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLL,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  timeText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "500",
    color: colors.gray,
  },
  contentText: {
    fontSize: 16,
  },
});
