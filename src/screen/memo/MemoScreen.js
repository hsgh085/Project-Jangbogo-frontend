import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../../assets/colors/colors";
import Header from "../../components/Header/Header";
import ShoppingItem from "../../components/ShoppingItem";
import SingleLineInput from "../../components/SingleLineInput";
import Spacer from "../../components/Spacer";
import { ROOT_API, TOKEN } from "../../constants/api";

const MemoScreen = (props) => {
  let flatListRef = useRef();
  const route = useRoute();
  const navigate = useNavigation();
  const [memo, setMemo] = useState({
    date: route.params?.date,
    title: "무제",
    totalPrice: 0,
  });
  const [shoppingList, setShoppingList] = useState([]);
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
  const toast = (message) => {
    Alert.alert("", `${message}`, [
      {
        text: "확인",
      },
    ]);
  };
  const handleChange = (title) => {
    setMemo({ ...memo, ["title"]: title });
  };
  const handleAddShopping = () => {
    const len = shoppingList.length;
    const lastId = len === 0 ? 0 : shoppingList[len - 1].id;
    const newShoppingList = [
      ...shoppingList,
      {
        id: lastId + 1,
        name: "",
        cnt: 0,
        price: 0,
        status: false,
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
            fetch(`${ROOT_API}/memo/deletememo?memoId=${route.params?.id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${TOKEN}`,
              },
            })
              .then(() => {
                Alert.alert("", "삭제되었습니다😊", [
                  {
                    text: "확인",
                    onPress: () => {
                      // navigate.navigate("MainStack", { screen: "MemoList" });
                      navigate.goBack();
                    },
                  },
                ]);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          text: "아니오",
          style: "cancle",
        },
      ],
      { cancelable: false }
    );
  };
  const handleSubmit = () => {
    if (shoppingList.length === 0) {
      toast("장보기 리스트를 추가해주세요😊");
    } else {
      if(route.params?.type === "detail"){
        fetch(`${ROOT_API}/memo/updatememo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            memoId: route.params?.id,
            memoListName: memo.title,
            memoListDate: memo.date,
            memoPrice: memo.totalPrice,
            memos: shoppingList,
          }),
        })
          .then(() => {
            Alert.alert("", "수정되었습니다😊", [
              {
                text: "확인",
                onPress: () => {
                  navigate.goBack();
                },
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else{
        fetch(`${ROOT_API}/memo/creatememo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            memoListName: memo.title,
            memoListDate: memo.date,
            memoPrice: memo.totalPrice,
            memos: shoppingList,
          }),
        })
          .then(() => {
            Alert.alert("", "저장되었습니다😊", [
              {
                text: "확인",
                onPress: () => {
                  navigate.goBack();
                },
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 200);
  };
  useEffect(() => {
    if (route.params?.type === "detail") {
      // 백엔드에서 get 통신
      fetch(`${ROOT_API}/memo/memolist/memoitem?fk_memo_id=${route.params?.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMemo({
            date: route.params?.date,
            title: data.memoinform.name,
            totalPrice: data.memoinform.total_price,
          });
          setShoppingList(data.memoItems);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Header>
        <Header.Title size={18}>장보기 작성</Header.Title>
        {route.params?.type === "detail" ? (<Pressable onPress={handleDeleteMemo}>
          <FontAwesome5 name="trash" size={18} color={colors.red} />
        </Pressable>):(<View/>)}
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
