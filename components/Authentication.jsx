import React, { useState } from "react";
import {
  Alert,
  Text,
  View,
  AppState,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import backgroundImage from "../assets/meditation-images/beach.webp";
import AppLogo from "../assets/indexMeditationLogo.png";
import AppGradient from "./AppGradient";
import { supabase } from "../lib/supabase";
import { Input } from "@rneui/themed";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      email_verification: false,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Error ocurred in signup!");
    setLoading(false);
  }

  return (
    <View className="flex-1 mt-4 rounded-t-3xl overflow-hidden">
      {/* Profile Widget */}
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        className="h-[272px] rounded-t-3xl"
      >
        <AppGradient
          colors={["transparent", "rgba(0, 0, 0, 0.9)"]}
          className="flex-1 justify-center items-center"
        >
          <SafeAreaView className="flex-1 justify-center items-center">
            {/* App Logo */}
            <Image source={AppLogo} className="h-52 w-52" />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
      {/* Authentication form */}
      <View className="py-5 px-4">
        <View>
          <View>
            <Input
              style={{ color: "white", fontFamily: "Montserrat-Regular" }}
              className="text-white font-medium bg-gray-800 rounded-lg px-4 py-2"
              placeholder="email@address.com"
              placeholderTextColor="gray"
              onChangeText={(text) => setEmail(text)}
              value={email}
              disabled={loading}
              autoCapitalize="none"
            />
          </View>
          <View>
            <Input
              style={{ color: "white", fontFamily: "Montserrat-Regular" }}
              className="text-white font-medium bg-gray-800 rounded-lg px-4 py-2"
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
              disabled={loading}
              autoCapitalize="none"
            />
          </View>
          <View className="my-4">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => signInWithEmail()}
              className="bg-white flex-row gap-2 rounded-xl h-[62px] justify-center items-center"
            >
              <AntDesign name="login" size={22} color="black" />
              <Text className="text-lg font-rmontb">Sign in</Text>
            </TouchableOpacity>
          </View>
          <View className="my-4">
            <CustomButton title="Sign up" onPress={() => signUpWithEmail()} />
          </View>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}
