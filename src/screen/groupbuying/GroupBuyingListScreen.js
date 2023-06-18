import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../../assets/colors/colors";
import banner from "../../../assets/images/GroupBuyingBanner.png";
import EndTimer from "./_com/EndTimer";
import HeaderMain from "../../components/HeaderMain";
import { ROOT_API, TOKEN } from "../../constants/api";
import { TokenContext } from "../../contexts/TokenContext";

const GroupBuyingListScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [token, setToken] = useContext(TokenContext);
  const [place, setPlace] = useState("");
  const [searchName, setSearchName] = useState("");
  const [gbList, setGBList] = useState([]);
  const [render,setRender]=useState(false);
  const handleClickPost = () => {
    navigation.navigate("GBPost", { place: place });
  };
  const handleClickSearch = () => {
    fetch(`${ROOT_API}/grouppurchase/searchgplist?name=${searchName}`, {
      method: "GET",
      headers: {
        //TODO: 테스트 끝낸 후 token으로 바꾸기
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setGBList(data.gpSearchList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetch(`${ROOT_API}/grouppurchase/gplist`, {
      method: "GET",
      headers: {
        //TODO: 테스트 끝낸 후 token으로 바꾸기
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGBList(data.gpList);
        setPlace(data.userLocation);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isFocused,render]);
  return (
    <>
      <View style={s.container}>
        <View style={s.header}>
          <HeaderMain>
            <Text style={s.headerText}>공동구매</Text>
            <View>
              <Text>동네위치</Text>
              <View style={s.locationContainer}>
                <Text style={s.locationText}>{place}</Text>
                <MaterialIcons name="location-on" size={20} color={colors.greenH} />
              </View>
            </View>
          </HeaderMain>
          <View style={s.searchContainer}>
            <Feather name="search" size={20} color="black" onPress={handleClickSearch} />
            <TextInput placeholder="상품명을 입력해주세요." onChangeText={(text) => setSearchName(text)} onSubmitEditing={handleClickSearch} />
          </View>
        </View>
        <TouchableOpacity onPress={handleClickPost} style={s.btnSave}>
          <MaterialCommunityIcons name="pencil" size={20} color={colors.white} />
          <Text style={s.textSave}>등록하기</Text>
        </TouchableOpacity>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={gbList}
          ListHeaderComponent={
            <View style={{ marginBottom: 10 }}>
              <Image source={banner} />
              <Text style={s.bannerText1}>이웃주민들과</Text>
              <Text style={s.bannerText2}>공동구매를 통해</Text>
              <Text style={s.bannerText3}>비용 절감!</Text>
              <Text style={s.bannerText4}>자원 절약!</Text>
              {gbList.length === 0 ? (
                <View style={{ padding: 20, alignItems: "center" }}>
                  <Text>등록된 공동구매가 없습니다.😢</Text>
                </View>
              ) : null}
            </View>
          }
          renderItem={({ item }) => {
            return (
              <View style={s.listContainer}>
                <Text numberOfLines={1} style={s.itemName}>
                  {item.name}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={s.infoContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={s.infoText1}>공동구매인원</Text>
                      <Text style={s.infoText2}>{item.participantsCount}</Text>
                      <Text style={s.infoText2}>/</Text>
                      <Text style={s.infoText2}>{item.peoplenum}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={s.infoText1}>마감까지</Text>
                      <EndTimer id={item.id} endTime={item.endTime} setRender={setRender}/>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={s.detailBtn}
                    onPress={() => {
                      navigation.navigate("GBDetail", { id: item.id });
                    }}
                  >
                    <Text style={s.detailText}>상세보기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default GroupBuyingListScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    fontWeight: 800,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.grayLL,
    borderRadius: 10,
    width: "90%",
  },
  locationContainer: {
    flexDirection: "row",
  },
  locationText: {
    fontWeight: "bold",
  },
  bannerText1: {
    position: "absolute",
    top: 30,
    left: 180,
    fontSize: 13,
  },
  bannerText2: {
    position: "absolute",
    top: 50,
    left: 200,
    fontSize: 13,
  },
  bannerText3: {
    position: "absolute",
    top: 90,
    left: 200,
    fontSize: 25,
    fontWeight: 500,
  },
  bannerText4: {
    position: "absolute",
    top: 120,
    left: 230,
    fontSize: 25,
    fontWeight: 500,
  },
  btnSave: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: colors.greenH,
  },
  textSave: {
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLL,
  },
  itemName: {
    width: "40%",
    fontWeight: 500,
  },
  infoContainer: {
    marginRight: 10,
  },
  detailBtn: {
    padding: 7,
    backgroundColor: colors.green,
    borderRadius: 7,
  },
  detailText: {
    color: colors.white,
    fontSize: 12,
  },
  infoText1: {
    fontSize: 12,
    marginRight: 5,
  },
  infoText2: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.green,
  },
});
