import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import colors from "../../assets/colors/colors";

const EndTimer = (props) => {
  const now = new Date();
  const end = new Date(props.endTime);
  const diff = end - now;
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const [timer, setTimer] = useState(diff);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => {
      // 컴포넌트가 언마운트되면 타이머 클리어
      clearInterval(interval);
    };
  }, [timer]);
  return (
    <>
      <Text style={{ fontSize: 12, fontWeight: 500, color: timer < 3600000 ? colors.red : colors.green }}>{`${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</Text>
    </>
  );
};

export default EndTimer;
