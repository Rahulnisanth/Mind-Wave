import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import Auth from "../../../components/Auth";
import Account from "../../../components/Account";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Profile() {
  const [session, setSession] = useState("" || null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View className="h-full flex-1 bg-[#202124]">
      <View className="px-5 py-12">
        <Text className="text-3xl font-rmontb text-white">Profile</Text>
        <Text className="text-lg font-rmonto text-white">
          Customize your meditations here
        </Text>
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
        ) : (
          <Auth />
        )}
      </View>
      <StatusBar style="light" />
    </View>
  );
}
