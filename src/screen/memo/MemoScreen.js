import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";
import ShoppingItem from "../../components/ShoppingItem";
import SingleLineInput from "../../components/SingleLineInput";
import Spacer from "../../components/Spacer";

const MemoScreen = (props) => {
  let flatListRef = useRef();
  const route = useRoute();
  const navigate = useNavigation();
  const [memo, setMemo] = useState({
    date: route.params?.date,
    title: "무제",
    totalPrice: 0,
  });
  const setShoppingListById = (id, key, value) => {
    const newList = shoppingList.map((e) => {
      if (e.id == id) {
        return { ...e, [key]: value };
      }
      return e;
    });
    setShoppingList(newList);
    setMemo({
      ...memo,
      ["totalPrice"]: newList.reduce((p, c) => p + c.cnt * c.price, 0),
    });
  };
  const [shoppingList, setShoppingList] = useState([]);

  const handleChange = (title) => {
    setMemo({ ...memo, ["title"]: title });
  };
  const handleAddShopping = () => {
    //NOTE: 백엔드에서 id값 auto increment속성으로 주면 id값 지정해줄 필요없음
    const len = shoppingList.length;
    const lastId = len === 0 ? 0 : shoppingList[len - 1].id;
    const newShoppingList = [
      ...shoppingList,
      {
        id: lastId + 1,
        name: "",
        cnt: 0,
        price: 0,
        state: false,
      },
    ];
    setShoppingList(newShoppingList);
    scrollToEnd();
  };
  const handleDeleteShopping = (shoppingId) => {
    const newShoppingList = shoppingList.filter((shopping) => shopping.id !== shoppingId);
    setShoppingList(newShoppingList);
  };
  const handleDeleteMemo = () => {
    Alert.alert(
      "주의",
      "전체 삭제하시겠습니까?",
      [
        {
          text: "예",
          onPress: () => {
            console.log("yes");
            navigate.goBack();
          },
        },
        {
          text: "아니오",
          onPress: () => console.log("no"),
          style: "cancle",
        },
      ],
      { cancelable: false }
    );
  };
  const handleSubmit = () => {
    Alert.alert("", "저장되었습니다😊", [
      {
        text: "확인",
        onPress: () => {
          navigate.goBack();
        },
      },
    ]);
  };
  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 200);
  };
  useEffect(() => {
    if (route.params?.type === "detail") {
      console.log(route.params?.id);
      // 백엔드에서 get 통신
      setMemo({ ...memo, ["title"]: route.params?.title });
      setShoppingList([
        { id: 0, name: "detail1", cnt: 0, price: 0, state: false },
        { id: 1, name: "detail2", cnt: 0, price: 0, state: false },
      ]);
    }
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Header>
        <Header.Title size={18}>장보기 작성</Header.Title>
        <Pressable onPress={handleDeleteMemo}>
          <FontAwesome5 name="trash" size={18} color={colors.red} />
        </Pressable>
      </Header>
      <View style={s.title}>
        <Text style={s.text1}>{memo.date}</Text>
        <SingleLineInput style={s.text2} value={memo.title} onChangeText={handleChange} />
        <Spacer space={15} />
        <View style={s.priceContainer}>
          <Text style={s.text1}>총 금액</Text>
          <Text style={s.text2}>{memo.totalPrice}원</Text>
        </View>
      </View>
      <View style={s.mainContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text>장보기 리스트</Text>
          <Pressable onPress={handleAddShopping} style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="pluscircleo" size={18} color={colors.greenH} />
            <Spacer horizontal={true} space={5} />
            <Text>추가</Text>
          </Pressable>
        </View>
        <Pressable onPress={handleSubmit} style={s.btnSave}>
          <Text style={s.textSave}>저장하기</Text>
        </Pressable>
        <FlatList
          ref={flatListRef}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          data={shoppingList}
          renderItem={({ item }) => {
            return <ShoppingItem data={item} setShopping={setShoppingListById} handleDeleteShopping={handleDeleteShopping} />;
          }}
        />
      </View>
    </View>
  );
};

export default MemoScreen;

const s = StyleSheet.create({
  title: {
    padding: 15,
    backgroundColor: colors.green,
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
        elevation: 10,
      },
    }),
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 5,
    marginBottom: 20,
  },
  btnSave: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: colors.greenH,
  },
  text1: {
    fontSize: 20,
    fontWeight: 300,
    color: colors.white,
  },
  text2: {
    fontSize: 30,
    color: colors.white,
  },
});
