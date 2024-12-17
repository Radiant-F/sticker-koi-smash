import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>StickerKoiSmash</Text>
      <Text style={{ color: "white" }}>version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
});
