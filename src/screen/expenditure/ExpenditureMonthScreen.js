import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Feather} from "@expo/vector-icons";
import colors from '../../../assets/colors/colors';


const ExpenditureMonthScreen = () => {
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onPressCalendar = useCallback(() => {
    setVisibleDatePicker(true);
  });
  return (
    <View style={s.container}>
      <View style={s.dateContainer}>
        <Text style={s.dateText}>
          {`${selectedDate.getFullYear()}.${
            selectedDate.getMonth() + 1
          }.${selectedDate.getDate()}`}
        </Text>
        <Feather
          name="calendar"
          size={18}
          color={colors.red}
          onPress={onPressCalendar}
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

export default ExpenditureMonthScreen;

const s = StyleSheet.create({
  container: {
    padding: 30,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 17,
    color: colors.gray,
    marginRight: 2,
  },
});
