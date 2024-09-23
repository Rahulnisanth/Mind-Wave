import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AFFIRMATION_GALLERY } from "../../../constants/Affirmation-Gallery";
import AppGradient from "../../../components/AppGradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const AffirmationsPractice = () => {
  const { id } = useLocalSearchParams();
  const [affirmation, setAffirmation] = useState();
  const [sentences, setSentences] = useState();
  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationsData = AFFIRMATION_GALLERY[idx].data;
      const affirmationToShow = affirmationsData.find(
        (dump) => dump.id === Number(id)
      );
      if (affirmationToShow) {
        setAffirmation(affirmationToShow);
        const affirmationSentences = affirmationToShow.text.split(".");
        if (affirmationSentences[affirmationSentences.length - 1] === "") {
          affirmationSentences.pop();
        }
        setSentences(affirmationSentences);
        return;
      }
    }
  }, []);
  return (
    <View className="h-screen flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={affirmation?.image}
      >
        <AppGradient
          colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.9)"]}
          className="flex-1 justify-center items-center"
        >
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

          {/* Contents */}
          <ScrollView
            className="mt-20 py-12"
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
          >
            <View className="h-full justify-center">
              <View className="h-4/5 px-6 justify-center">
                {sentences?.map((sentence) => (
                  <Text
                    key={sentence}
                    className="text-white mb-12 text-2xl leading-8 tracking-wide text-center font-bold"
                  >
                    {sentence}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationsPractice;
