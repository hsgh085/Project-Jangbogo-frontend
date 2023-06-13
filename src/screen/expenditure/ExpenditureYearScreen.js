import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import colors from "../../../assets/colors/colors";
import { ROOT_API, TOKEN } from "../../constants/api";

const ExpenditureYearScreen = () => {
  const currYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currYear);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${ROOT_API}/expenditure/expendyear?year=${selectedYear}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedYear]);
  return (
    <View style={s.container}>
      <Picker selectedValue={selectedYear} onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)} style={s.selectYear}>
        <Picker.Item label={`${currYear}년`} value={currYear} />
        <Picker.Item label={`${currYear - 1}년`} value={currYear - 1} />
        <Picker.Item label={`${currYear - 2}년`} value={currYear - 2} />
        <Picker.Item label={`${currYear - 3}년`} value={currYear - 3} />
        <Picker.Item label={`${currYear - 4}년`} value={currYear - 4} />
      </Picker>
      <ScrollView style={s.chartConatiner} horizontal={true} showsHorizontalScrollIndicator={false}>
        <BarChart
          data={{
            labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={450}
          height={Dimensions.get("window").width - 50}
          fromZero={true}
          showValuesOnTopOfBars={true}
          yAxisSuffix={"원"}
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
