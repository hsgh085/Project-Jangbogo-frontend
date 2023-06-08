import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header/Header";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import colors from "../../../assets/colors/colors";
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const navigation = useNavigation();
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const handleTakePicture=async()=>{
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data);
      setImageUri(data.uri);
      navigation.navigate("Ripeness", {screen: 'RipenessResult', params: { imageUri: data.uri },});
    }
  }
  return (
    <>
      <View style={styles.container}>
        <Header color="white" />
        <Camera ref={(ref) => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={"1:1"} />
        <TouchableOpacity style={styles.circleButtonContainer} onPress={handleTakePicture}>
          <View style={styles.circleButton} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  circleButtonContainer: {
    width: 84,
    height: 84,
    borderWidth: 4,
    borderColor: colors.greenH,
    borderRadius: 42,
    padding: 3,
    marginVertical: 20,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: colors.white,
  },
});

export default CameraScreen;
