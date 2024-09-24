import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

const CustomButton = ({
  title,
  onPress,
  textStyles = "",
  buttonStyles = "",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`bg-white rounded-xl min-h-[62px] justify-center items-center ${buttonStyles}`}
    >
      <Text className={`text-lg font-rmontb ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
