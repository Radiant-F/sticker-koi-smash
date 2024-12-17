import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { ImageSource } from "expo-image";

type Props = {
  visible?: boolean;
  onRequestClose?: () => void;
  onSelect: (sticker: ImageSource) => void;
};

export default function ModalSticker({
  visible,
  onRequestClose,
  onSelect,
}: Props) {
  const dataEmoji: ImageSource[] = [
    require("@/assets/images/emojis/emoji1.png"),
    require("@/assets/images/emojis/emoji2.png"),
    require("@/assets/images/emojis/emoji3.png"),
    require("@/assets/images/emojis/emoji4.png"),
    require("@/assets/images/emojis/emoji5.png"),
    require("@/assets/images/emojis/emoji6.png"),
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <Animatable.View
        style={styles.container}
        animation={"fadeInUp"}
        useNativeDriver
        duration={300}
      >
        <Pressable style={styles.backdrop} onPress={onRequestClose} />
        <View style={styles.viewModal}>
          <View style={styles.modalHeader}>
            <Text style={{ color: "white" }}>Choose a Sticker</Text>
            <TouchableOpacity activeOpacity={0.75} onPress={onRequestClose}>
              <Icon name="close-circle-outline" size={25} color={"white"} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.containerSticker}
          >
            {dataEmoji.map((v, i) => (
              <TouchableOpacity
                key={i}
                style={{ margin: 10 }}
                activeOpacity={0.75}
                onPress={() => onSelect(v)}
              >
                <Image source={v} style={{ width: 80, height: 80 }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animatable.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerSticker: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalHeader: {
    backgroundColor: "#464C55",
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewModal: {
    height: 200,
    backgroundColor: "#25292e",
    borderTopRightRadius: 20,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    width: "100%",
    alignSelf: "center",
    maxWidth: 580,
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.25,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
