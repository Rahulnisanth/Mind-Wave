import { View, ImageBackground, Text, SafeAreaView } from "react-native";
import beachImage from "@/assets/meditation-images/beach.webp";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import AppGradient from "../components/AppGradient";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0, 0, 0, 0.8)"]}>
          <SafeAreaView className="flex-1 justify-center items-center px-3 py-12">
            <SafeAreaView className="flex-1 mx-5 my-12 justify-between">
              <View>
                <Text className="text-center text-white text-4xl font-extrabold">
                  Mind Wave
                </Text>
                <Text className="text-center mt-3 text-white text-regular text-2xl font-semibold">
                  Simplifying the process of meditation
                </Text>
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
