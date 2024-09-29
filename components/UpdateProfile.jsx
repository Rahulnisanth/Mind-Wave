import { useState } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "@rneui/themed";
import Avatar from "./Avatar";

const UpdateProfile = ({
  setIsUpdating,
  session,
  username,
  avatarUrl,
  setAvatarUrl,
}) => {
  const [loading, setLoading] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      } else {
        Alert.alert("Profile updated successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url) => {
            setAvatarUrl(url);
          }}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          style={{ color: "white", fontFamily: "Montserrat-Regular" }}
          label="Email"
          value={session?.user?.email}
          disabled
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          style={{ color: "white", fontFamily: "Montserrat-Regular" }}
          label="Username"
          value={newUsername}
          onChangeText={(text) => setNewUsername(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() =>
            updateProfile({ username: newUsername, avatar_url: avatarUrl })
          }
          disabled={loading}
        />
      </View>
      <View className="mt-4">
        <Button title="Go Back" onPress={() => setIsUpdating(false)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

export default UpdateProfile;
