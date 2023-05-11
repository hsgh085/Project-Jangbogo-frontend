import { StatusBar } from 'expo-status-bar';
import { Platform,StyleSheet, Text, View, Button,Alert } from 'react-native';
import { Octicons, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const MemoMainScreen = () => {
    return (
        <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.text1}>장보기</Text>
          <Text style={styles.text1}>메모</Text>
        </View>
        <View style={styles.register}>
        <MaterialCommunityIcons name="pencil" size={24} color="#00FF9D" />
          <Text style={styles.text2}>작성하기</Text>
        </View>
      </View>
      
      <Button title="작성" 
        style={styles.btn1}
        onPress={()=>{
          Alert.alert("작성 시작");
          console.log('clicked')
      }}/>

      <View style={styles.main}>

      </View>
      {/* <View style={styles.footer}>
        <MaterialIcons name="home-filled" size={25} color="#8D8D8D" />
        <Ionicons name="person" size={23} color="#8D8D8D" />
        <FontAwesome5 name="shopping-bag" size={20} color="#8D8D8D" />
        <Octicons name="bell-fill" size={20} color="#8D8D8D" />
      </View> */}
    </View>
    );
};

export default MemoMainScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ECECEC'
    },
    header:{
      flex:1,
      flexDirection:'row',
      padding:15,
      paddingTop:30,
      alignItems:'center',
      backgroundColor:'white',
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
          elevation: 3,
        },
      })
    },
    main:{
      flex:6,
    },
    footer:{
      backgroundColor:'white',
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal:50,
      justifyContent:'space-between',
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
    },
    title:{
      flex:1,
    },
    register:{
      flexDirection:'row'
    },
    text1:{
      fontSize:30,
      fontWeight:800
    },
    text2:{
      fontSize:20,
    },
    btn1:{
      fontSize:20,
      backgroundColor:'FFFFFF',
      flex: 1,
    }
  });