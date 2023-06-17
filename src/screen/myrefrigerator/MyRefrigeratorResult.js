// MyRefrigeratorResult.js
import React from 'react';
import { View, Text } from 'react-native';

const MyRefrigeratorResult = ({ route }) => {
  const { row } = route.params;

  return (
    <View>
      <Text>바코드 정보:</Text>
      <Text>{`제품명: ${row.PRDUCTNM}`}</Text>
      <Text>{`허가번호: ${row.FLD_PRDUCT_PRMT_NO}`}</Text>
      {/* 여기에 더 많은 정보를 렌더링할 수 있습니다. */}
    </View>
  );
};

export default MyRefrigeratorResult;
