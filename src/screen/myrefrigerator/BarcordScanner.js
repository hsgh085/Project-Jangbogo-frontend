import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const API_KEY = '2e778ab5ba2240679524';
const API_ENDPOINT = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/C005/json/1/5`;

const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onBarcodeScanned = async (barcodeInfo) => {
    if (barcodeInfo.type === 'org.gs1.EAN-13' && !isLoading) {
      setIsLoading(true);
      const response = await fetch(
        API_ENDPOINT + '/&BAR_CD=' + barcodeInfo.data,
        {
          method: 'GET',
        },
      );

      if (response.status === 200) {
        const responseJson = await response.json();

        // 이후에 사용할 responseJson의 일부 데이터를 가져옵니다.
        const row = responseJson.C005.row[0];
        console.log(row);

        setIsLoading(false);
        navigation.navigate('MyRefrigeratorResult', {
          row,
        });
      } else {
        setIsLoading(false);
        alert('바코드 정보를 가져오는데 실패했습니다.');
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', marginVertical: 200 }}>
      <Text>바코드를 가운데 인식시켜주세요</Text>
      <Camera
        onBarCodeScanned={onBarcodeScanned}
        style={{ flex: 1 }}
        barCodeScannerSettings={{
          barCodeTypes: ['org.gs1.EAN-13'],
        }}
      />
    </View>
  );
};

export default BarcodeScanner;
