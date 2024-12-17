import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

export default function ButtonAddSticker() {
  return (
    <TouchableOpacity activeOpacity={0.75} style={styles.container}>
      <View style={styles.btn}>
        <Icon name="plus-thick" size={25} color={"black"} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 30,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    borderColor: "gold",
    borderWidth: 3,
  },
});
