import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";
const platformOS = Platform.OS;

export default function useDimensions() {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width:
      platformOS == "web" ? window.innerWidth : Dimensions.get("screen").width,
    height:
      platformOS == "web"
        ? window.innerHeight
        : Dimensions.get("screen").height,
  });

  useEffect(() => {
    if (platformOS == "web") {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    } else if (platformOS == "android" || platformOS == "ios") {
      const handleResize = () =>
        Dimensions.addEventListener("change", ({ screen }) => {
          setDimensions({ width: screen.width, height: screen.height });
        });

      return () => handleResize;
    }
  }, []);

  return dimensions;
}
