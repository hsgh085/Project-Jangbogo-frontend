import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from '../../../assets/colors/colors';

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
    </View>
  );
};

export default ExpenditureYearScreen;

const s = StyleSheet.create({
    container:{
        padding:15,
    },
    selectYear:{
        width:140,
        color:colors.gray,
    },
});
