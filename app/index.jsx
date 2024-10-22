import { View, ImageBackground, Text, SafeAreaView, Image } from "react-native";
import beachImage from "@/assets/meditation-images/beach.webp";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import AppGradient from "../components/AppGradient";
import MeditationLogo from "@/assets/indexMeditationLogo.png";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.5)", "rgba(0, 0, 0, 0.9)"]}>
          <SafeAreaView className="flex-1 justify-center items-center px-3 py-12">
            <SafeAreaView className="flex-1 mx-5 pt-5 my-12 justify-between">
              <View className="flex-grow items-center">
                <Text className="text-white font-rmontb text-center text-5xl tracking-widest">
                  Mind Wave
                </Text>
                <Text className="text-white font-rmonto text-center text-xl opacity-80">
                  Simplifying the process of meditation
                </Text>
              </View>

              <View className="flex-1 justify-center items-center mb-5">
                <Image
                  source={MeditationLogo}
                  resizeMode="cover"
                  className="h-64 w-64"
                />
              </View>

              <View>
                <CustomButton
                  onPress={() => router.push("/nature-meditate")}
                  title="Get Started"
                />
              </View>
              <StatusBar style="light" />
            </SafeAreaView>
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
}
