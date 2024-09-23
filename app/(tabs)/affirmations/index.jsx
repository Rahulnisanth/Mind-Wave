import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AFFIRMATION_GALLERY } from "../../../constants/Affirmation-Gallery";
import GuidedAffirmationsGallery from "../../../components/GuidedAffirmationsGallery";

const Affirmations = () => {
  return (
    <View className="h-full flex-1 bg-[#202124]">
      <ScrollView className="px-5 py-12" showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-semibold text-white">
          Change your beliefs with affirmations
        </Text>
        <View className="pb-12">
          {AFFIRMATION_GALLERY.map((item) => (
            <GuidedAffirmationsGallery
              title={item.title}
              key={item.title}
              previews={item.data}
            />
          ))}
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
};

export default Affirmations;
