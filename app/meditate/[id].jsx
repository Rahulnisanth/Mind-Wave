import { View, Text, ImageBackground, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AppGradient from "../../components/AppGradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import MeditationImages from "../../constants/Meditation-Images";
import CustomButton from "../../components/CustomButton";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/Meditation-Data";
import { useDuration } from "../../stores/durationStore";

const MeditatePractice = () => {
  const { id } = useLocalSearchParams();
  // Zustand store...
  const { secondsRemaining, setSecondsRemaining } = useDuration();
  const [meditating, setMeditating] = useState(false);
  const [audioSound, setAudioSound] = useState();
  const [playAudio, setPlayAudio] = useState(false);

  useEffect(() => {
    let timerId;
    if (secondsRemaining === 0) {
      setMeditating(false);
      return;
    }
    if (meditating) {
      timerId = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, meditating]);

  useEffect(() => {
    return () => audioSound?.unloadAsync();
  }, [audioSound]);

  const toggleMeditationStatus = async () => {
    if (secondsRemaining === 0) setSecondsRemaining(25);
    setMeditating(!meditating);
    await toggleSound();
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();
    const status = await sound?.getStatusAsync();
    if (status?.isLoaded && !playAudio) {
      await sound.playAsync();
      setPlayAudio(true);
    } else {
      await sound.pauseAsync();
      setPlayAudio(false);
    }
  };

  const initializeSound = async () => {
    const audioName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioName]);
    setAudioSound(sound);
    return sound;
  };

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  const handleDuration = () => {
    if (meditating) toggleMeditationStatus();
    router.push("/(modal)/adjust-duration");
  };

  return (
    <View className="h-screen flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={MeditationImages[Number(id) - 1]}
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
          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 h-44 w-44 rounded-full justify-center items-center">
              <Text className="text-4xl text-[#202124] font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5 mx-5">
            <CustomButton title="Adjust Duration" onPress={handleDuration} />
          </View>
          <View className="mb-12 mx-5">
            <CustomButton
              title="Start Meditation"
              onPress={toggleMeditationStatus}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default MeditatePractice;
