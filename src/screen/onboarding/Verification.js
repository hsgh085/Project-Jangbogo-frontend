import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import Header from '../../components/Header/Header';

const Verification = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    /** 인증에 성공했을 때 회원가입 폼으로 넘어가는 상태 변수 */
    // const [isSignUpFormScreenOpen, setIsSignUpFormScreenOpen] = useState(false);
    /** 에러 메세지 상태 변수 */
    const [errorMessage, setErrorMessage] = useState('');
    /** 인증번호 상자의 상태 변수 */
    const [inputBorderColor, setInputBorderColor] = useState('#000');

    // useEffect(() => {
    //     if (isSignUpFormScreenOpen) {
    //         // SignUpForm.js screen 열기
    //         navigation.navigate("SignUpForm");
    //     }
    // }, [isSignUpFormScreenOpen]);

    const phoneNumber = route.params?.hp;

    /** 타이머 변수 */
    const [timer, setTimer] = useState(180);

    /** 커서 이동 변수 */
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);

    /** 인증번호 입력 값 저장 상태 */
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');

    // 인증번호 합치기
    const fullCode = Number(input1 + input2 + input3 + input4);

    const fetchVerificationCode = async (hp, fullCode) => {
        console.log("서버전달전code 값: ", fullCode);
        console.log("서버전달전hp 값: ", hp);
        const response = await fetch(
            'http://3.34.24.220/auth/verify-verification-code',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hp: hp, verificationCode: fullCode }),
            }
        )
            .then(navigation.navigate("SignUpForm"))
            .catch((err) => {
                console.log(err)
                setErrorMessage('인증번호가 올바르지 않습니다.');
                setInputBorderColor('red');
                setInput1('');
                setInput2('');
                setInput3('');
                setInput4('');
                input1Ref.current.focus();
            });

    }

    /** 커서 이동과 입력값 저장 */
    const onChangeText1 = (value) => {
        setInput1(value);
        if (value.length === 1) {
            input2Ref.current.focus();
        }
    }
    /** 커서 이동과 입력값 저장 */
    const onChangeText2 = (value) => {
        setInput2(value);
        if (value.length === 1) {
            input3Ref.current.focus();
        }
    }
    /** 커서 이동과 입력값 저장 */
    const onChangeText3 = (value) => {
        setInput3(value);
        if (value.length === 1) {
            input4Ref.current.focus();
        }
    }
    /** 입력값 저장 */
    const onChangeText4 = (value) => {
        setInput4(value);
    }

    /** 타이머 관련 함수 */
    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    /** 새로운 인증번호 요청 및 타이머 초기화 */
    // const handleResendVerification = async () => {
    //     await requestVerificationCode(phoneNumber);
    //     setTimer(180);
    // };

    /** 타이머 만료 시 */
    useEffect(() => {
        const timerExpired = timer === 0;

        if (timerExpired) {
            //handleResendVerification(phoneNumber);
            setTimer(180);
        }
    }, [timer, phoneNumber]);


    const requestVerificationCode = async () => {
        try {
            console.log("재전송할때 phoneNumber 값: ", phoneNumber);
            const response = await fetch(
                'http://3.34.24.220/auth/send-verification-code',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ hp: phoneNumber }),
                }
            );

            if (response.status === 200) {
                // 인증번호 요청 성공
            } else {
                console.error('Error requesting verification code: ', response.status);
            }
        } catch (error) {
            console.error('Error requesting verification code:', error);
        }
    };


    const minute = Math.floor(timer / 60);
    const second = Math.floor(timer % 60);

    return (
        <View>
            {/* 회원가입 헤더 */}
            <Header>
                <Header.Title size={18} style={styles.Header}>회원가입</Header.Title>
                <View></View>
            </Header>
            <View style={styles.container}>
                {/* 인증번호 타이틀 */}
                <View style={styles.container_title}>
                    <Text style={styles.h1}>인증번호 입력</Text>
                    <Text style={styles.h2}>인증번호 4자리가 발송되었습니다</Text>
                </View>
                {/* 인증번호 타이머 */}
                <View style={styles.verification_time}>
                    <Text style={[styles.h2, styles.highlight]} >{`${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`}</Text>
                </View>
                {/* 에러 메세지 */}
                <View style={styles.verification_time}>
                    <Text style={[styles.h2, styles.highlight]} >{errorMessage}</Text>
                </View>
                {/* 인증번호 입력칸 */}
                <View style={styles.verification_fields}>
                    <TextInput style={styles.verification_input}
                        ref={input1Ref}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={onChangeText1}
                        placeholder='-' />
                    <TextInput style={styles.verification_input}
                        ref={input2Ref}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={onChangeText2}
                        placeholder='-' />
                    <TextInput style={styles.verification_input}
                        ref={input3Ref}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={onChangeText3}
                        placeholder='-' />
                    <TextInput style={styles.verification_input}
                        ref={input4Ref}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={onChangeText4}
                        placeholder='-' />
                </View>
                {/* 인증번호 버튼 */}
                <View style={styles.verification_verify}>
                    <Pressable
                        style={styles.verification_button}
                        onPress={() => {
                            console.log("버튼 클릭시 핸드폰: ", phoneNumber);
                            fetchVerificationCode(phoneNumber, fullCode);
                            //setIsSignUpFormScreenOpen(true);
                        }}
                    >
                        <Text style={styles.h2}>인증하기</Text>
                    </Pressable>
                </View>
                {/* 인증번호 재전송 */}
                <View style={styles.verification_retry}>
                    <Text style={styles.h2}>인증번호가 오지 않아요!</Text>
                    <Text style={[styles.highlight, styles.h2]}
                    //   onPress={handleResendVerification}
                    > 재전송</Text>

                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginLeft: 60,
        marginRight: 60,
    },
    container_title: {

    },
    h1: {
        fontSize: 30,
        fontWeight: "bold",
    },
    h2: {
        fontSize: 16,
    },

    highlight: {
        color: '#00FF9D',
    },
    verification_fields: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    verification_input: {
        width: 55,
        height: 60,
        marginHorizontal: 10,
        borderRadius: 16,
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
        fontSize: 24,
    },
    verification_verify: {

    },
    verification_button: {
        backgroundColor: '#00FF9D',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
    },

    verification_time: {
        margintop: 10,
        marginLeft: 'auto',
        marginBottom: 5,
    },
    verification_retry: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    }

});

export default Verification;
