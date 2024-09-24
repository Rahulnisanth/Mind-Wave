import { View, Text, Pressable, SafeAreaView } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useDuration } from "../../stores/durationStore";

const AdjustDuration = () => {
  const { setSecondsRemaining } = useDuration();
  const handleButtonSubmit = (duration) => {
    setSecondsRemaining(duration);
    router.back();
  };
  return (
    <View className="h-full flex-1 bg-[#202124]">
      <SafeAreaView className="py-5 px-5">
        {/* Back Button */}
        <Pressable
          className="absolute top-12 left-5 z-10"
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back-circle-outline"
            size={50}
            color="white"
          />
        </Pressable>
        {/* Duration Options */}
        <View className="mt-48 justify-center">
          <Text className="text-3xl text-center mb-6 text-white font-extrabold">
            Adjust your meditating duration here
          </Text>
          <View className="mb-3 mx-5">
            <CustomButton
              title="1 minutes"
              onPress={() => handleButtonSubmit(60)}
            />
          </View>
          <View className="mb-3 mx-5">
            <CustomButton
              title="5 minutes"
              onPress={() => handleButtonSubmit(60 * 5)}
            />
          </View>
          <View className="mb-3 mx-5">
            <CustomButton
              title="10 minutes"
              onPress={() => handleButtonSubmit(60 * 10)}
            />
          </View>
          <View className="mb-3 mx-5">
            <CustomButton
              title="15 minutes"
              onPress={() => handleButtonSubmit(60 * 15)}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AdjustDuration;
