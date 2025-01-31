import { View, Text, Animated, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Props = {
  text: string;
} & React.ComponentProps<typeof Text>;

const AnimatedText = ({ text, className }: Props) => {

  const [innerText, setInnerText] = useState("");

  const animation = useRef(new Animated.Value(1));

  useEffect(() => {
    //first moment - transition to 0

    Animated.timing(animation.current, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
      easing: Easing.sin,
    }).start();

    setTimeout(() => {

      setInnerText(text);

      Animated.timing(animation.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
        easing: Easing.sin,
      }).start();
    }, 301);

  }, [text]);

  return (
    <Animated.Text
      style={{
        opacity: animation.current,
      }}
      className={clsx("font-semibold text-p-black text-4xl", className)}
    >
      {innerText}
    </Animated.Text>
  );
};

export default AnimatedText;
