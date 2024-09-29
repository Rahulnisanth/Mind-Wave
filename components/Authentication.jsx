import React, { useState } from "react";
import {
  Alert,
  View,
  AppState,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import backgroundImage from "../assets/affirmation-images/night-sky-4.webp";
import AppLogo from "../assets/indexMeditationLogo.png";
import AppGradient from "./AppGradient";
import { supabase } from "../lib/supabase";
import { Input } from "@rneui/themed";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";

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
          colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
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
              label="Email"
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
              label="Password"
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
              disabled={loading}
              autoCapitalize="none"
            />
          </View>
          <View className="mb-4">
            <CustomButton title="Sign in" onPress={() => signInWithEmail()} />
          </View>
          <View className="mb-4">
            <CustomButton title="Sign up" onPress={() => signUpWithEmail()} />
          </View>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}
