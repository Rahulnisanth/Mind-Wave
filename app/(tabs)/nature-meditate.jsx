import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MEDITATION_DATA } from "@/constants/Meditation-Data";
import MeditationImages from "../../constants/Meditation-Images";
import AppGradient from "../../components/AppGradient";

const NatureMeditate = () => {
  return (
    <View className="h-full flex-1 bg-[#202124]">
      <SafeAreaView className="px-5 py-12">
        <View className="mb-3">
          <Text className="text-3xl font-semibold text-white">Welcome</Text>
          <Text className="text-lg text-white">
            Start your meditation practice today
          </Text>
        </View>
        <View className="mb-12">
          <FlatList
            data={MEDITATION_DATA}
            className="mb-20"
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => console.log("pressed")}
                className="h-48 my-3 rounded-md overflow-hidden"
              >
                <ImageBackground
                  className="h-48 flex-1 rounded-lg"
                  resizeMode="cover"
                  source={MeditationImages[item.id - 1]}
                >
                  <AppGradient
                    colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
                    className="flex-1 justify-center items-center"
                  >
                    <View className="flex-1 justify-center items-center">
                      <Text className="text-3xl text-center font-bold text-white">
                        {item.title}
                      </Text>
                    </View>
                  </AppGradient>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
      </SafeAreaView>
      <StatusBar style="light" />
    </View>
  );
};

export default NatureMeditate;
