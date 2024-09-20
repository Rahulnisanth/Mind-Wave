import { View, ImageBackground } from "react-native";
import beachImage from "@/assets/meditation-images/beach.webp";
import { SafeAreaView } from "react-native";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import AppGradient from "../components/AppGradient";
import StyledText from "../components/StyledText";

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
                <StyledText className="text-center text-white text-4xl font-bold uppercase">
                  Mind Wave
                </StyledText>
                <StyledText className="text-center mt-3 text-white text-regular text-2xl font-semibold">
                  Simplifying the process of meditation
                </StyledText>
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
