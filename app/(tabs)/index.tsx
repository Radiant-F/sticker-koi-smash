import {
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Alert,
  Linking,
} from "react-native";
import { useRef, useState } from "react";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import useDimensions from "@/hooks/useDimensions";
import domToImage from "dom-to-image";

export default function Home() {
  // image picker
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

  // emoji modal and app options
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [visibleModalSticker, setVisibleModalSticker] = useState(false);
  const closeModalSticker = () => setVisibleModalSticker(false);
  const [selectedSticker, setSelectedSticker] = useState<ImageSource | null>();

  // save media permission
  const [status, requestPermission] = MediaLibrary.usePermissions();
  async function onRequestPermissionLibrary(): Promise<boolean> {
    try {
      const status = await requestPermission();
      if (status.granted) {
        console.log("library permission granted.", status);
        return true;
      } else if (!status.canAskAgain) {
        Alert.alert(
          "Media Permission Required",
          "Open app settings to grant your permission?",
          [
            {
              text: "Open Settings",
              onPress: async () => await Linking.openSettings(),
            },
            { text: "Cancel", style: "cancel" },
          ]
        );
        return false;
      } else return false;
    } catch (error) {
      console.log("error requesting media permission:", error);
      return Promise.reject(error);
    }
  }

  // save media
  const imageRef = useRef<View>(null);
  const { height, width } = useDimensions();
  async function onSaveImage() {
    try {
      // for android and ios using
      if (Platform.OS == "android" || Platform.OS == "ios") {
        const hasPermission = await onRequestPermissionLibrary();
        if (hasPermission) {
          const localUri = await captureRef(imageRef, {
            height: height - 400,
            quality: 1,
          });

          await MediaLibrary.saveToLibraryAsync(localUri);
          if (localUri) {
            Alert.alert("", "Image saved!");
          }
        }
      } else {
        // for web
        const dataUrl = await domToImage.toJpeg(imageRef.current as any, {
          quality: 1,
          width: width - 50,
          height: height - 400,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.log("error saving image:", error);
    }
  }

  // reset to default image and remove selected sticker
  function onReset() {
    const reset = () => {
      setSelectedImage(require("@/assets/images/default.png"));
      setSelectedSticker(null);
      setShowAppOptions(false);
    };
    if (
      selectedImage != require("@/assets/images/default.png") ||
      selectedSticker != null
    ) {
      Alert.alert("", "Discard changes?", [
        {
          text: "Discard",
          onPress: () => reset(),
        },
        { text: "Cancel" },
      ]);
      if (Platform.OS == "web") {
        const confirm = window.confirm("Discard changes?");
        confirm && reset();
      }
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View ref={imageRef} collapsable={false}>
        <ImageViewer source={selectedImage} />
        {selectedSticker && <StickerViewer source={selectedSticker} />}
      </View>
      <Gap flex={1} />
      {showAppOptions ? (
        <ViewOptions
          onPressAddSticker={() => setVisibleModalSticker(true)}
          onPressSave={onSaveImage}
          onPressReset={onReset}
        />
      ) : (
        <View style={styles.viewImageSelection}>
          <ButtonCustom title="Select an Image" onPress={onSelectImage} />
          <ButtonCustom
            title="Use this Image"
            primary={false}
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <Gap flex={0.25} />

      <ModalSticker
        visible={visibleModalSticker}
        onRequestClose={closeModalSticker}
        onSelect={(sticker) => {
          setSelectedSticker(sticker);
          closeModalSticker();
        }}
      />
      {Platform.OS == "ios" && <StatusBar barStyle={"light-content"} />}
    </GestureHandlerRootView>
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
