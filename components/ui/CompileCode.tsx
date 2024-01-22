import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import CodeCompile from "../CodeCompile";
import { useAccount, useSignMessage } from "wagmi";
import ConnectWallet from "../ConnectWallet";
import InputBox from "../utils/InputBox";
import { celo } from "viem/chains";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  FiraCode_300Light,
  FiraCode_400Regular,
  FiraCode_500Medium,
  FiraCode_600SemiBold,
  FiraCode_700Bold,
} from '@expo-google-fonts/fira-code';
import { myStyle } from "../CodeCompile";

export default function CompileCode() {
  const [selectedValue, setSelectedValue] = useState("");
  const [text, setText] = useState("");
  const { address, isConnecting, isDisconnected } = useAccount();

  const handleButtonPress = () => {
    console.log("Button pressed!");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.buttonText2, { alignSelf: "flex-start" }]}>
        <Ionicons name="ios-cube-outline" size={24} color="grey" />
        <Text style={[styles.buttonText]}>
          Compile Code
        </Text>
      </View>
      {!address ? (
        <>
          <ConnectWallet />
        </>
      ) : (
        <>
          <CodeCompile />
        </>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    paddingTop: 70,
    color: "white",
    // backgroundColor: "#131415",
    backgroundColor: "black",

  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "blue",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700", // Center text within the button
    lineHeight: 48, // Adjust as needed
    width: "100%", // Take up full width
    paddingHorizontal: 7, // Padding for left-aligned content
    // alignItems: 'flex-start', // Align items to the left
  },

  buttonText2: {
    paddingHorizontal: 20, // Padding for left-aligned content
    // alignItems: 'flex-start', // Align items to the left
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(19, 20, 21, 1)",
    padding: 10,
    marginBottom: 2,
    fontFamily: 'FiraCode_300Light'


  },
  address: {
    flexDirection: "row", // Ensure content is aligned horizontally
    justifyContent: "space-between", // Spread items across the available space
    alignItems: "center", // Align items vertically
    backgroundColor: "#1E1F21",
    borderRadius: 12,
    width: "90%",
    padding: 10,
    marginBottom: 15,
  },
});
