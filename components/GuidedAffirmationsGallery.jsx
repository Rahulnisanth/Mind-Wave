import { View, Text, FlatList, Pressable, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const GuidedAffirmationsGallery = ({ title, previews }) => {
  return (
    <View className="my-5">
      <View className="mb-4 border-b border-gray-600 pb-2">
        <Text className="text-xl font-semibold text-white">{title}</Text>
      </View>
      <View className="space-y-2">
        <FlatList
          data={previews}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/affirmations/${item.id}`} asChild>
              <Pressable>
                <View className="h-36 w-32 rounded-lg mr-4 bg-gray-800 shadow-lg">
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    className="h-full w-full rounded-lg"
                  />
                </View>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </View>
  );
};

export default GuidedAffirmationsGallery;
