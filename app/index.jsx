import { View, Text, ImageBackground } from "react-native";
import beachImage from "@/assets/meditation-images/beach.webp";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          className="flex-1"
          colors={["rgba(0,0,0,0.4)", "rgba(0, 0, 0, 0.8)"]}
        >
          <SafeAreaView className="flex-1 mx-5 my-12 justify-between">
            <View>
              <Text className="text-center text-white text-4xl font-bold uppercase">
                Mind Wave
              </Text>
              <Text className="text-center mt-3 text-white text-regular text-2xl font-semibold">
                Simplifying the process of meditation
              </Text>
            </View>
            <View>
              <CustomButton
                onPress={() => console.log("Tap")}
                title="Get Started"
              />
            </View>
            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
