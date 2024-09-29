import backgroundImage from "../assets/affirmation-images/night-sky-4.webp";
import defaultProfileImage from "../assets/affirmation-images/mountain-meditate-4.webp";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  View,
  Alert,
  Text,
  Image,
  Pressable,
  ImageBackground,
  ScrollView,
} from "react-native";
import AppGradient from "./AppGradient";
import UpdateProfile from "./UpdateProfile";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomizedAffirmations from "./CustomizedAffirmations";

export default function Account({ session }) {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (session) getProfile();
  }, [session, isUpdating]);

  useEffect(() => {
    if (avatarUrl) downloadImage(avatarUrl);
  }, [avatarUrl]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result);
      };
    } catch (error) {
      if (error instanceof Error) {
        setAvatarUrl(avatarUrl);
      }
    }
  }

  async function getProfile() {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  if (isUpdating) {
    return (
      <UpdateProfile
        setIsUpdating={setIsUpdating}
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        setAvatarUrl={setAvatarUrl}
      />
    );
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
          colors={["transparent", "rgba(0, 0, 0, 0.3)"]}
          className="flex-1 justify-center items-center"
        >
          <SafeAreaView className="px-5 -mt-2">
            <View className="w-32 h-32 overflow-hidden rounded-2xl border-2 border-white">
              {avatarUrl ? (
                <Image
                  className="h-32 w-32 object-cover rounded-2xl"
                  accessibilityLabel="Avatar"
                  source={{ uri: avatarUrl }}
                />
              ) : (
                <Image
                  className="h-32 w-32 object-cover rounded-2xl"
                  accessibilityLabel="Avatar"
                  source={defaultProfileImage}
                />
              )}
            </View>
            <View className="my-3">
              <Text className="text-white font-rmontb text-3xl tracking-wider">
                {username}
              </Text>
            </View>
            <View className="flex-row gap-4 items-center">
              <View>
                <Pressable onPress={() => supabase.auth.signOut()}>
                  <MaterialCommunityIcons
                    name="chevron-left-circle"
                    size={40}
                    color="white"
                  />
                </Pressable>
              </View>
              <View>
                <Pressable onPress={() => setIsUpdating(true)}>
                  <MaterialIcons name="build-circle" size={40} color="white" />
                </Pressable>
              </View>
              <View>
                <Pressable onPress={() => console.log("streak pressed")}>
                  <MaterialCommunityIcons
                    name="fire-circle"
                    size={40}
                    color="white"
                  />
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
      {/* Contents below the profile widget */}
      <View className="flex-1 bg-[#202124]">
        <ScrollView className="px-5">
          <View>
            <CustomizedAffirmations />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
