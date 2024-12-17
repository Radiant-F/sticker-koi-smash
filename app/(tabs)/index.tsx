import { StatusBar, StyleSheet, View, Platform } from "react-native";
import { useState } from "react";
import {
  ButtonCustom,
  Gap,
  ImageViewer,
  ModalSticker,
  StickerViewer,
  ViewOptions,
} from "@/components";
import * as ImagePicker from "expo-image-picker";
import { type ImageSource } from "expo-image";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<ImageSource>(
    require("@/assets/images/default.png")
  );
  async function onSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        selectionLimit: 1,
        allowsEditing: true,
      });
      if (result.assets) {
        const uri = result.assets[0].uri;
        setSelectedImage({ uri });
        setShowAppOptions(true);
      }
    } catch (error) {
      console.log("error selecting image:", error);
    }
  }

  const [showAppOptions, setShowAppOptions] = useState(false);
  const [visibleModalSticker, setVisibleModalSticker] = useState(false);
  const closeModalSticker = () => setVisibleModalSticker(false);
  const [selectedSticker, setSelectedSticker] = useState<
    ImageSource | undefined
  >();

  return (
    <View style={styles.container}>
      <ImageViewer source={selectedImage} />
      {selectedSticker && <StickerViewer source={selectedSticker} />}
      <Gap flex={1} />
      {showAppOptions ? (
        <ViewOptions onPressAddSticker={() => setVisibleModalSticker(true)} />
      ) : (
        <View style={styles.viewImageSelection}>
          <ButtonCustom title="Select a Image" onPress={onSelectImage} />
          <ButtonCustom
            title="Use this Image"
            primary={false}
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <Gap flex={0.25} />
      {Platform.OS == "ios" && <StatusBar barStyle={"light-content"} />}

      <ModalSticker
        visible={visibleModalSticker}
        onRequestClose={closeModalSticker}
        onSelect={(sticker) => {
          setSelectedSticker(sticker);
          closeModalSticker();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewImageSelection: {
    width: "80%",
    alignSelf: "center",
    maxWidth: 420,
  },
  containerImage: {
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    maxWidth: 520,
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
});
