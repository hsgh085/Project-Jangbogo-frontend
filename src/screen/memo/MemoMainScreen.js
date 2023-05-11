import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import colors from "../../../assets/colors/colors";

const MemoMainScreen = () => {
  const today = new Date();
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const onPressCalendar = useCallback(() => {
    setVisibleDatePicker(true);
  });
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.text1}>장보기</Text>
          <Text style={styles.text1}>메모</Text>
        </View>
        <View style={styles.register}>
          <MaterialCommunityIcons name="pencil" size={24} color="#00FF9D" />
          <Text style={styles.text2}>작성</Text>
        </View>
      </View>

      {/* <Button title="작성" style={styles.btn1} onPress={onPressCalendar} /> */}

      <View style={styles.main}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {selectedDate === null
              ? `${today.getFullYear()}.${
                  today.getMonth() + 1
                }.${today.getDate()}`
              : `${selectedDate.getFullYear()}.${
                  selectedDate.getMonth() + 1
                }.${selectedDate.getDate()}`}
          </Text>
          <Feather name="calendar" size={22} color={colors.red} onPress={onPressCalendar}/>
        </View>
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

export default MemoMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECECEC",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    paddingTop: 30,
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
    flex: 6,
    padding:12,
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
    fontSize: 20,
  },
  btn1: {
    fontSize: 20,
    backgroundColor: colors.white,
  },
  dateContainer:{
    flexDirection: 'row',
    alignItems:'center',
  },
  dateText:{
    fontSize:22,
    color: colors.green,
    marginRight:2,
  }
});
