import { Dimensions, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
  useAnimatedStyle,
} from "react-native-reanimated";
import clsx from "clsx";

const SHEET_OVER_DRAG = 20;

type Props = {
  onClose: () => void;
  children?: React.ReactNode;
  height?: number;
  styles?: ViewStyle;
  className?: string;
  position?: "bottom" | "top";
};

const Sheet = ({
  onClose,
  children,
  height = 300,
  styles,
  className,
  position = "bottom",
}: Props) => {
  const offset = useSharedValue(0);
  const width = Dimensions.get("window").width;
  const isBottom = position === "bottom";

  const close = () => {
    offset.value = 0;
    onClose();
  };

  const pan = Gesture.Pan()
    .onChange((e) => {
      const delta = isBottom ? e.changeY : -e.changeY; // Inverter para top
      const offsetDelta = delta + offset.value;
      const clamp = Math.max(-SHEET_OVER_DRAG, offsetDelta);

      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < height / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withSpring(height * (isBottom ? 1 : -1), {}, () => {
          runOnJS(close)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: isBottom ? offset.value : -offset.value }],
    width,
    height,
    position: "absolute",
    [isBottom ? "bottom" : "top"]: -SHEET_OVER_DRAG * 1.4,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={{
          ...translateY,
          ...styles,
        }}
        className={clsx("dark:bg-zinc-700 bg-gray-100 p-3", className)}
      >
        <TouchableOpacity className="mx-auto" onPress={() => onClose()}>
          <MaterialCommunityIcons size={24} name="drag-horizontal" className="mx-auto" />
        </TouchableOpacity>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default Sheet;
