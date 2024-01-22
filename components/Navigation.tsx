import { Text, Platform, View, Animated, TouchableWithoutFeedback } from "react-native";
// import { Home, Portfolio, Prices, Settings, Transaction } from "./screens";
// import { CompileCode, DeployCode, SolCode } from './ui'
import React, { useState } from 'react';
import CompileCode from "./ui/CompileCode";
import SolCode from "./ui/SolCode";
import DeployCode from "./ui/DeployCode";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// Thanks for watching
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 100,
    backgroundColor: "rgba(30, 31, 33, 1)",
    borderColor: 'red',
    border: 1
  },
  activeTintColor: "#e91e63",

};
export default function Navigation() {
  const [animation] = useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const renderTabBarIcon = (iconName, focused, tabColor) => (
    <TouchableWithoutFeedback onPress={() => startAnimation()}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {/* Icon */}
        {iconName === "code" ? (
          <Feather name={iconName} size={24} color={tabColor} />
        ) : (
          <Ionicons name={iconName} size={24} color={tabColor} />
        )}

        {/* Animated Rectangle */}
        {focused && (
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: 4,
              width: 20,
              backgroundColor: "#FF5733",
              transform: [
                {
                  scaleX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );


  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={SolCode}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Feather name="code" size={24} color="grey" />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={CompileCode}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {/* <Entypo
                    name="cube"
                    size={24}
                    color={focused ? "white" : "white"}
                  /> */}

                  <Ionicons name="ios-cube-outline" size={24} color={focused ? "grey" : "grey"} />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Deploy Code"
          component={DeployCode}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {/* <Entypo
                    name="upload"
                    size={24}
                    color={focused ? "white" : "white"}
                  /> */}
                  <Feather name="upload-cloud" size={24} color="grey" />
                  {/* <Text style={{ fontSize: 12, color: "#16247d" }}>
                    Deploy
                  </Text> */}
                </View>
              );
            },
          }}
        />
        {/* <Tab.Screen
          name="Transaction"
          component={SolCode}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#16247d",
                    width: Platform.OS == "ios" ? 50 : 60,
                    height: Platform.OS == "ios" ? 50 : 60,
                    top: Platform.OS == "ios" ? -10 : -20,
                    borderRadius: Platform.OS == "ios" ? 25 : 30,
                  }}
                >
                  <FontAwesome name="exchange" size={24} color="#fff" />
                </View>
              );
            },
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
