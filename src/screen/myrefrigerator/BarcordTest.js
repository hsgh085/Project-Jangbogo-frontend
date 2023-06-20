import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';

const API_KEY = '2e778ab5ba2240679524';
const API_ENDPOINT = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/C005/json/1/5/`;

const BarcordTest = () => {

    /** 카메라 관련 상태변수 */
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    /** 바코드 관련 상태변수 */
    // 8801019005909
    const [barcord, setBarcord] = useState('8801043034562');

    /** 카메라 Permission */
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = (e) => {
        setScanned(true);
        setBarcord(e.data);
        fetchBarcord();
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    /** 바코드 API fetch 함수
     *  
     *  요청 인자 : BAR_CD (바코드번호)
     * 
     *  출력 인자 : PRDLST_NM (제품명), BSSH_NM (제조사명), PRDLST_DCNM	(식품 유형), POG_DAYCNT(유통/소비기한)
     *  
     */
    const fetchBarcord = async () => {
        const response = await fetch(
            API_ENDPOINT + 'BAR_CD=' +
            barcord,
            {
                method: 'GET',
            },
        );

        if (response.status === 200) {
            const responseJson = await response.json();
            // console.log(responseJson.C005.row[0])
            console.log('===바코드정보===');
            console.log(responseJson.C005.row[0].BAR_CD);
            console.log(responseJson.C005.row[0].PRDLST_NM);
            console.log(responseJson.C005.row[0].BSSH_NM);
            console.log(responseJson.C005.row[0].PRDLST_DCNM);
            console.log(responseJson.C005.row[0].POG_DAYCNT);
            return responseJson.C005.row[0];
        } else {
            return 0;
            // throw new Error('unable to get');
        }
    };

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <Header>
                <Header.Title size={18}>나의 냉장고</Header.Title>
                <View></View>
            </Header>
            {/* 카메라 */}
            <Text>{console.log(hasPermission)}</Text>
            <View style={{ flex: 1, justifyContent: 'center', marginVertical: 10 }}>
                <Camera
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                />
                {scanned && (
                    <Pressable style={styles.button}
                        onPress={() => setScanned(false)}
                    >
                        <Text>바코드 재스캔</Text>
                    </Pressable>
                )}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#00FF9D',
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
      marginBottom: 20,
    },
    h2: {
      fontSize: 22,
      color: '#ffffff',
    },
  })

export default BarcordTest;