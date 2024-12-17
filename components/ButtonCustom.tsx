import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

type Props = {
  primary?: boolean;
  title?: string;
  onPress?: () => void;
};

export default function ButtonCustom({
  primary = true,
  onPress,
  title = "Button Custom",
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        ...styles.container,
        borderColor: primary ? "gold" : "transparent",
      }}
      onPress={onPress}
    >
      <View
        style={{
          ...styles.btnView,
          backgroundColor: primary ? "white" : "transparent",
        }}
      >
        {primary && <Icon name="image" color={"black"} size={20} />}
        <Text style={{ ...styles.text, color: primary ? "black" : "white" }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    fontSize: 16,
    marginHorizontal: 5,
  },
  btnView: {
    flex: 1,
    margin: 5,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    height: 60,
    borderWidth: 3,
    borderRadius: 20,
  },
});
