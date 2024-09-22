import React from "react";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#202124",
          borderTopWidth: 0,
          height: 50,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#a5a5a5",
      }}
    >
      <Tabs.Screen
        name="nature-meditate"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="flower-tulip"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="affirmations"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-sharp" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
