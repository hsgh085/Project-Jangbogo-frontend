import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../../../assets/colors/colors";
import { BarChart } from "react-native-chart-kit";

const ExpenditureYearScreen = () => {
  const [selectedYear, setSelectedYear] = useState();
  return (
    <View style={s.container}>
      <Picker
        selectedValue={selectedYear}
        onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
        style={s.selectYear}
      >
        <Picker.Item label="2023년" value="2023" />
        <Picker.Item label="2022년" value="2022" />
        <Picker.Item label="2021년" value="2021" />
        <Picker.Item label="2020년" value="2020" />
        <Picker.Item label="2019년" value="2019" />
      </Picker>
      <ScrollView
        style={s.chartConatiner}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <BarChart
          data={{
            labels: [
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43, 77, 62, 12, 10, 90, 50],
              },
            ],
          }}
          width={550}
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

export default ExpenditureYearScreen;

const s = StyleSheet.create({
  container: {
    padding: 15,
  },
  selectYear: {
    width: 140,
    color: colors.gray,
  },
  chartConatiner: {
    transform: [{ rotate: "90deg" }],
    width: Dimensions.get("window").width + 50,
    position: "relative",
    left: -40,
    top: 45,
  },
  chartStyle: {
    marginVertical: 10,
    borderRadius: 16,
  },
});
