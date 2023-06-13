import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import colors from "../../assets/colors/colors";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import SingleLineInput from "./SingleLineInput";

const ShoppingItem = (props) => {
  const shopping = props.data;
  const handleChange = useCallback((key, value) => {
    props.setShopping(props.data.id, key, value);
  });

  const handleCntMinus = useCallback(() => {
    if (props.data.cnt > 0) {
      props.setShopping(props.data.id, "cnt", shopping.cnt - 1);
    }
  });
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor:
          props.data.status === true ? colors.grayLL : colors.greenLL,
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
      }}
    >
      <Pressable onPress={() => handleChange("status", !props.data.status)}>
        <FontAwesome5
          name="check-circle"
          size={20}
          color={props.data.status === true ? colors.green : colors.gray}
        />
      </Pressable>
      <SingleLineInput
        value={shopping.name}
        placeholder={"상품입력"}
        onChangeText={(text) => handleChange("name", text)}
        style={s.itemName}
      />
      <View style={s.cntContainer}>
        <Pressable onPress={handleCntMinus}>
          <Feather name="chevron-left" size={24} color={colors.gray} />
        </Pressable>
        <Text style={s.cntText}>{shopping.cnt}</Text>
        <Pressable onPress={() => handleChange("cnt", shopping.cnt + 1)}>
          <Feather name="chevron-right" size={24} color={colors.gray} />
        </Pressable>
      </View>
      {props.data.status === true ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SingleLineInput
            value={parseInt(shopping.price)}
            placeholder={"가격입력"}
            onChangeText={(text) => handleChange("price", text)}
            type="numeric"
            style={s.priceText}
          />
          <Text style={{ color: colors.green }}>(원)</Text>
        </View>
      ) : (
        <Pressable onPress={()=>props.handleDeleteShopping(shopping.id)}>
          <FontAwesome5 name="trash" size={15} color={colors.green} />
        </Pressable>
      )}
    </View>
  );
};

export default ShoppingItem;

const s = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: props.data.state === true ? colors.grayLL : colors.greenLL,
  //   borderRadius: 10,
  //   padding: 12,
  //   marginBottom: 10,
  // },
  itemName: {
    marginLeft: 10,
    width: 100,
    fontSize: 16,
  },
  cntContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cntText: {
    marginHorizontal: 5,
    color: colors.gray,
    fontSize: 16,
  },
  priceText: {
    width: 75,
    color: colors.green,
    fontSize: 16,
  },
});
