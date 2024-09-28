import React from "react";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#202124",
          borderTopWidth: 0,
          height: 60,
          paddingVertical: 10,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#a5a5a5",
      }}
    >
      <Tabs.Screen
        name="nature-meditate"
        options={{
          tabBarLabel: "Meditation",
          tabBarLabelStyle: { fontFamily: "Montserrat-Regular" },
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
          tabBarLabel: "Affirmations",
          tabBarLabelStyle: { fontFamily: "Montserrat-Regular" },
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { fontFamily: "Montserrat-Regular" },
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
