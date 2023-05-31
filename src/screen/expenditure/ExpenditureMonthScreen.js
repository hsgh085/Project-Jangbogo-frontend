import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";
import colors from "../../../assets/colors/colors";
import { BarChart } from "react-native-chart-kit";

const ExpenditureMonthScreen = () => {
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [labels, setLabels] = useState([]);
  const onPressCalendar = useCallback(() => {
    setVisibleDatePicker(true);
  });
  useEffect(() => {
    if (
      selectedDate.getMonth() + 1 === 1 ||
      selectedDate.getMonth() + 1 === 3 ||
      selectedDate.getMonth() + 1 === 5 ||
      selectedDate.getMonth() + 1 === 7 ||
      selectedDate.getMonth() + 1 === 8 ||
      selectedDate.getMonth() + 1 === 10 ||
      selectedDate.getMonth() + 1 === 12
    ) {
      setLabels([
        "1일",
        "2일",
        "3일",
        "4일",
        "5일",
        "6일",
        "7일",
        "8일",
        "9일",
        "10일",
        "11일",
        "12일",
        "13일",
        "14일",
        "15일",
        "16일",
        "17일",
        "18일",
        "19일",
        "20일",
        "21일",
        "22일",
        "23일",
        "24일",
        "25일",
        "26일",
        "27일",
        "28일",
        "29일",
        "30일",
        "31일",
      ]);
    } else if (selectedDate.getMonth() + 1 === 2) {
      setLabels([
        "1일",
        "2일",
        "3일",
        "4일",
        "5일",
        "6일",
        "7일",
        "8일",
        "9일",
        "10일",
        "11일",
        "12일",
        "13일",
        "14일",
        "15일",
        "16일",
        "17일",
        "18일",
        "19일",
        "20일",
        "21일",
        "22일",
        "23일",
        "24일",
        "25일",
        "26일",
        "27일",
        "28일",
      ]);
    } else {
      setLabels([
        "1일",
        "2일",
        "3일",
        "4일",
        "5일",
        "6일",
        "7일",
        "8일",
        "9일",
        "10일",
        "11일",
        "12일",
        "13일",
        "14일",
        "15일",
        "16일",
        "17일",
        "18일",
        "19일",
        "20일",
        "21일",
        "22일",
        "23일",
        "24일",
        "25일",
        "26일",
        "27일",
        "28일",
        "29일",
        "30일",
      ]);
    }
  }, [selectedDate]);
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
      <ScrollView
        style={s.chartConatiner}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <BarChart
          data={{
            labels: labels,
            datasets: [
              {
                data: [
                  20, 45, 28, 80, 99, 43, 77, 62, 12, 10, 90, 50, 40, 30, 20,
                  10, 20, 30, 40, 50, 60, 70, 80, 90, 80, 70, 60, 50, 40, 30,
                ],
              },
            ],
          }}
          width={1000}
          height={Dimensions.get("window").width - 50}
          fromZero={true}
          showValuesOnTopOfBars={true}
          yAxisSuffix={"만원"}
          horizontalLabelRotation={270}
          verticalLabelRotation={270}
          chartConfig={{
            barPercentage: 0.5,
            backgroundColor: colors.white,
            backgroundGradientFrom: "#FAFAFA",
            backgroundGradientTo: "#FAFAFA",
            fillShadowGradient: colors.greenH,
            fillShadowGradientOpacity: 1,
            decimalPlaces: 0, //소수점 자리수
            color: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={s.chartStyle}
        />
      </ScrollView>
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
  chartConatiner: {
    transform: [{ rotate: "90deg" }],
    width: Dimensions.get("window").width + 50,
    position: "relative",
    left: -55,
    top: 50,
  },
  chartStyle: {
    marginVertical: 10,
    borderRadius: 16,
  },
});
