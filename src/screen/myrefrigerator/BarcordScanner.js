import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';

const API_KEY = '2e778ab5ba2240679524';
const API_ENDPOINT = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/C005/json/1/5`;

const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [barcodeDetected, setBarcodeDetected] = useState(false);
  const [barcodeData, setBarcodeData] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onBarcodeScanned = async (barcodeInfo) => {
    if (!scanning) return;
    if (barcodeInfo.type === 'org.gs1.EAN-13' && !isLoading) {
      setScanning(false);
      setIsLoading(true);
      const response = await fetch(
        API_ENDPOINT + '/&BAR_CD=' + barcodeInfo.data,
        {
          method: 'GET',
        },
      );

      if (response.status === 200) {
        const responseJson = await response.json();

        const row = responseJson.C005?.row[0]; // 수정된 부분: Optional chaining
        console.log(row);

        if (row) { // 결측치 여부 확인
          setBarcodeDetected(true);
          setBarcodeData(barcodeInfo.data);

          setIsLoading(false);
          navigation.navigate('MyRefrigeratorResult', {
            row,
          });
        } else {
          setBarcodeDetected(false);
          setIsLoading(false);
          alert('바코드 정보를 가져오는데 실패했습니다. 적절한 데이터를 찾을 수 없습니다.');
        }
      }
    };
  }

  const startScanning = () => {
    setScanning(!scanning);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title size={18}>나의 냉장고</Header.Title>
        <View></View>
      </Header>
      <View style={{ flex: 1, justifyContent: 'center', marginVertical: 10 }}>
        <Text>{barcodeDetected ? '바코드가 인식되지 않았습니다.' : '바코드를 가운데 인식시켜주세요'}</Text>
        {barcodeData ? <Text>인식된 바코드: {barcodeData}</Text> : null}
        <Camera
          onBarCodeScanned={onBarcodeScanned}
          style={{ flex: 1 }}
          barCodeScannerSettings={{
            barCodeTypes: ['org.gs1.EAN-13'],
          }}
        />
        <Pressable
          style={styles.button}
          onPress={startScanning}
        >
          <Text style={styles.h2}>바코드 인식하기</Text>
        </Pressable>
        {barcodeData ? <Text>인식된 바코드: {barcodeData}</Text> : null}
      </View>
    </View>

  );
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

export default BarcodeScanner;
