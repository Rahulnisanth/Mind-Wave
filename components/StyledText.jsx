import { useFonts } from "expo-font";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Text } from "react-native";

const StyledText = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text style={{ fontFamily: "Montserrat_400Regular" }}>{children}</Text>
  );
};

export default StyledText;
