import { DimensionValue, View } from "react-native";

type Props = {
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  flex?: number | undefined;
};

export default function Gap({ flex, height, width }: Props) {
  return <View style={{ width, height, flex }} />;
}
