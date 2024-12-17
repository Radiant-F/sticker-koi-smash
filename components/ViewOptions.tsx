import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

type Props = {
  onPressReset?: () => void;
  onPressAddSticker?: () => void;
  onPressSave?: () => void;
};

export default function ViewOptions({
  onPressAddSticker,
  onPressReset,
  onPressSave,
}: Props) {
  return (
    <View style={styles.containerOptions}>
      <TouchableOpacity
        style={styles.btnOption}
        activeOpacity={0.75}
        onPress={onPressReset}
      >
        <Text style={{ color: "white" }}>Reset</Text>
        <Icon name="refresh" color={"white"} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.containerAddSticker}
        onPress={onPressAddSticker}
      >
        <View style={styles.btnAddSticker}>
          <Icon name="plus-thick" size={25} color={"black"} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnOption}
        activeOpacity={0.75}
        onPress={onPressSave}
      >
        <Text style={{ color: "white" }}>Save</Text>
        <Icon name="download" color={"white"} size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnOption: {
    alignItems: "center",
    width: 50,
    height: 50,
    justifyContent: "space-between",
  },
  btnAddSticker: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 30,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  containerAddSticker: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    borderColor: "gold",
    borderWidth: 3,
  },
  containerOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    maxWidth: 420,
  },
});
