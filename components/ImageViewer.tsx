import { StyleProp, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image, ImageSource, ImageStyle } from "expo-image";
import useDimensions from "@/hooks/useDimensions";

export default function ImageViewer({
  source = require("@/assets/images/default.png"),
}: {
  source: ImageSource;
}) {
  const { height, width } = useDimensions();
  const imageStyle: StyleProp<ImageStyle> = {
    width: "100%",
    minHeight: height - 400,
    borderRadius: 20,
    overflow: "hidden",
  };

  return (
    <View style={{ ...styles.containerImage, width: width - 50 }}>
      <Image source={source} contentFit="cover" style={imageStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    maxWidth: 520,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
});
