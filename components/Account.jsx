import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { View, Alert, Text, Button } from "react-native";
import UpdateProfile from "./UpdateProfile";
import Avatar from "./Avatar";

export default function Account({ session }) {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (session) getProfile();
  }, [session, isUpdating]);

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
      />
    );
  }

  return (
    <View className="py-10">
      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url) => {
            setAvatarUrl(url);
          }}
        />
      </View>
      <Text className="text-white font-rmonto">Username: {username}</Text>
      <View className="mt-4">
        <Button title="Update Profile" onPress={() => setIsUpdating(true)} />
      </View>
      <View className="mt-4">
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}
