import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image, ImageSource } from "expo-image";
import useDimensions from "@/hooks/useDimensions";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function StickerViewer({ source }: { source: ImageSource }) {
  const { width, height } = useDimensions();
  const size = 40;
  const scaleImage = useSharedValue(size);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== size * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        style={[
          containerStyle,
          {
            ...styles.containerImage,
            width: width - 50,
            minHeight: height - 400,
          },
        ]}
      >
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={source}
            resizeMode={"contain"}
            style={[imageStyle, { width: size, height: size }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    maxWidth: 520,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    position: "absolute",
  },
});
