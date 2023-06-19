import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../assets/colors/colors";
import EndTimer from '../groupbuying/_com/EndTimer';
import { TokenContext } from '../../contexts/TokenContext';

const MypageGBScreen = () => {
  const route = useRoute();
  const type = route.params?.type;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [token, setToken] = useContext(TokenContext);
  const [gbList, setGBList] = useState([]);
  const [render,setRender]=useState(false);
  useEffect(()=>{
    // TODO: 마이페이지 공동구매 리스트 받아오기
    if(type==="self"){

    }
    else if(type==="participate"){

    }
    else if(type==="done"){

    }
  },[isFocused])
  return (
    <>
      <View style={s.container}>
        {type === "self" && <Text>self</Text>}
        {type === "participate" && <Text>participate</Text>}
        {type === "done" && <Text>done</Text>}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={gbList}
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
                        {/* TODO: 마감 타이머 말고 종료시각 또는 장소 보여주기 */}
                      <Text style={s.infoText1}>종료시각</Text>
                      
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

export default MypageGBScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:10,
    paddingBottom: 100,
    backgroundColor: colors.white,
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
