import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import colors from "../../../assets/colors/colors";
import { ROOT_API } from "../../constants/api";
import { TokenContext } from "../../contexts/TokenContext";

const ExpenditureMonthScreen = () => {
  const [token, setToken] = useContext(TokenContext);
  const currYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currYear);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(token);
    fetch(`${ROOT_API}/expenditure/expendmonth?year=${selectedYear}&month=${selectedMonth}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (
      selectedMonth === 1 ||
      selectedMonth === 3 ||
      selectedMonth === 5 ||
      selectedMonth === 7 ||
      selectedMonth === 8 ||
      selectedMonth === 10 ||
      selectedMonth === 12
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
    } else if (selectedMonth === 2) {
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
  }, [selectedYear, selectedMonth]);
  return (
    <View style={s.container}>
      <View style={{ flexDirection: "row" }}>
        <Picker
          mode="dropdown"
          selectedValue={selectedYear}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
          style={s.selectYear}
        >
          <Picker.Item label={`${currYear}년`} value={currYear} />
          <Picker.Item label={`${currYear - 1}년`} value={currYear - 1} />
          <Picker.Item label={`${currYear - 2}년`} value={currYear - 2} />
          <Picker.Item label={`${currYear - 3}년`} value={currYear - 3} />
          <Picker.Item label={`${currYear - 4}년`} value={currYear - 4} />
        </Picker>
        <Picker
          mode="dropdown"
          selectedValue={selectedMonth}
          onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
          style={s.selectYear}
        >
          <Picker.Item label={"1월"} value={1} />
          <Picker.Item label={"2월"} value={2} />
          <Picker.Item label={"3월"} value={3} />
          <Picker.Item label={"4월"} value={4} />
          <Picker.Item label={"5월"} value={5} />
          <Picker.Item label={"6월"} value={6} />
          <Picker.Item label={"7월"} value={7} />
          <Picker.Item label={"8월"} value={8} />
          <Picker.Item label={"9월"} value={9} />
          <Picker.Item label={"10월"} value={10} />
          <Picker.Item label={"11월"} value={11} />
          <Picker.Item label={"12월"} value={12} />
        </Picker>
      </View>
      <ScrollView style={s.chartConatiner} horizontal={true} showsHorizontalScrollIndicator={false}>
        <BarChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={1000}
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

export default ExpenditureMonthScreen;

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
