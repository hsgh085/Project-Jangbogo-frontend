import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header/Header';

const PIPP = () => {
  return (
    <View>
        <Header>
          <Header.Title size={18} style={styles.Header}>개인정보 처리방침</Header.Title>
        </Header>
        <ScrollView style={styles.scrollView}>
        <Text style={styles.Text1}>이용자님의 권리 및 의무를 이해하기 위하여 애플리케이션 소프트웨어 개인정보 처리방침(이하 "본 약관")을 주의 깊게 읽어주시길 바랍니다.</Text>
        <Text>개인정보의 처리목적
          장보고는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          1. 회원 가입 및 관리
            회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리 시 법정대리인의 동의여부 확인, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.
          장보고는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리· 보유합니다.
          2 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
            1. 홈페이지 회원 가입 및 관리 : 사업자/단체 홈페이지 탈퇴 시까지
              다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
              1. 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지
              2. 홈페이지 이용에 따른 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지

          본 약관은 2023년 06월 10일부터 시행됩니다.
        </Text>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  Text1: {
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: 21,
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  },

});

export default PIPP;