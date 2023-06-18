import React, { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import colors from "../../../../assets/colors/colors";
import { ROOT_API, TOKEN } from "../../../constants/api";

const EndTimer = (props) => {
  const now = new Date();
  const end = new Date(props.endTime);
  const diff = Math.max(0, end - now); // 음수일 경우 0으로 설정
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const [timer, setTimer] = useState(diff);
  const [timeOut, setTimeOut] = useState(false);

  const handleTimeOut = useCallback(() => {
    fetch(`${ROOT_API}/grouppurchase/timeoutgp?gpId=${props.id}`, {
      method: "POST",
      headers: {
        //TODO: 테스트 후 토큰 바꾸기
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then(() => {
        console.log("삭제");
        props.setRender((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setTimeOut(true);
      }
    }, 1000);

    return () => {
      // 컴포넌트가 언마운트되면 타이머 클리어
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (timeOut) {
      handleTimeOut();
    }
  }, [timeOut]);

  return (
    <>
      <Text style={{ fontSize: 12, fontWeight: 500, color: timer < 3600000 ? colors.red : colors.green }}>{`${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</Text>
    </>
  );
};

export default EndTimer;
