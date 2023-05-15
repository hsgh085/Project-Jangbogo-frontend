import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import colors from "../../../assets/colors/colors";

const MemoListScreen = () => {
  const navigation = useNavigation();
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onPressCalendar = useCallback(() => {
    setVisibleDatePicker(true);
  });
  const onPressRegister = useCallback(() => {
    navigation.navigate("MemoPost",{date:`${selectedDate.getFullYear()}.${
      selectedDate.getMonth() + 1
    }.${selectedDate.getDate()}`});
  });
  const [data, setData] = useState([
    {
      id: 0,
      title: "오늘 저녁 장보기",
      percentage: 100,
      totalPrice: 0,
      createdAt: "2023.02.19",
      updateAt: "2023.02.19",
    },
    {
      id: 1,
      title: "오늘 저녁 장보기",
      percentage: 100,
      totalPrice: 0,
      createdAt: "2023.02.19",
      updateAt: "2023.02.19",
    },
    {
      id: 2,
      title: "오늘 저녁 장보기",
      percentage: 100,
      totalPrice: 0,
      createdAt: "2023.02.19",
      updateAt: "2023.02.19",
    },
    {
      id: 3,
      title: "오늘 저녁 장보기",
      percentage: 100,
      totalPrice: 0,
      createdAt: "2023.02.19",
      updateAt: "2023.02.19",
    },
    {
      id: 4,
      title: "오늘 저녁 장보기",
      percentage: 100,
      totalPrice: 0,
      createdAt: "2023.02.19",
      updateAt: "2023.02.19",
    },
    {
      id: 5,
      title: "오늘 저녁 장보기",
      percentage: 100,
      totalPrice: 0,
      createdAt: "2023.02.19",
      updateAt: "2023.02.19",
    },
    {
      id: 6,
      title: "test6",
      percentage: 100,
      totalPrice: 0,
      createdAt: "2023.02.19",
      updateAt: "2023.02.19",
    },
  ]);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.text1}>장보기</Text>
          <Text style={styles.text1}>메모</Text>
        </View>
        <Pressable onPress={onPressRegister}>
          <View style={styles.register} onPress={onPressRegister}>
            <MaterialCommunityIcons name="pencil" size={24} color="#00FF9D" />
            <Text style={styles.text2}>작성</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.main}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {`${selectedDate.getFullYear()}.${
              selectedDate.getMonth() + 1
            }.${selectedDate.getDate()}`}
          </Text>
          <Feather
            name="calendar"
            size={22}
            color={colors.red}
            onPress={onPressCalendar}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("Memo", { item });
                }}
              >
                <View style={styles.memoContainer}>
                  <View style={styles.memoInfo}>
                    <Text style={styles.createAt}>{item.createdAt}</Text>
                    <Text style={styles.text2}>{item.title}</Text>
                  </View>
                  <Ionicons
                    name="md-chevron-forward-sharp"
                    size={24}
                    color={colors.greenH}
                  />
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <DateTimePicker
        isVisible={visibleDatePicker}
        mode="date"
        onConfirm={(date) => {
          setSelectedDate(new Date(date));
          setVisibleDatePicker(false);
        }}
        onCancel={() => {
          setVisibleDatePicker(false);
        }}
      />
    </View>
  );
};
export default MemoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayLL,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#ECECEC",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  main: {
    flex: 7,
    padding: 15,
    marginBottom: 90,
  },
  title: {
    flex: 1,
  },
  register: {
    flexDirection: "row",
  },
  text1: {
    fontSize: 30,
    fontWeight: 800,
  },
  text2: {
    fontSize: 19,
  },
  btn1: {
    fontSize: 20,
    backgroundColor: colors.white,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 22,
    color: colors.green,
    marginRight: 2,
  },
  memoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#ECECEC",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  memoInfo: {
    flex: 1,
  },
  createAt: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: 400,
  },
});
