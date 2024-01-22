import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import ConnectWallet from "../ConnectWallet";
import Account from "../SendTransaction";
import { useAccount, useSignMessage } from "wagmi";
import { styles } from "./CompileCode";
import { Entypo, EvilIcons, Ionicons } from "@expo/vector-icons";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { Feather } from "@expo/vector-icons";
import { useAppContext } from "../../context/AppContext";

export default function DeployCode() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const truncatedAddress = address ? address.slice(0, 25) : "";
  const { bytecode } = useAppContext();
  const initialText = "Nothing To Deploy\nCompile Code First";
  const [text, setText] = useState(initialText);

  const NonEditableTextBox = () => {
    return (
      <View style={mYstyles.container2}>
        <View style={mYstyles.textBox}>
          <Text style={mYstyles.text}>
            Nothing To Deploy {"\n"} Compile Code First
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.buttonText2, { alignSelf: "flex-start" }]}>
        <Feather name="upload-cloud" size={24} color="grey" />
        <Text style={[styles.buttonText]}>Deploy Code</Text>
      </View>
      <View style={mYstyles.container}>
        {!address ? (
          <>
            <ConnectWallet />
          </>
        ) : (
          <>
            <View style={[styles.address, { marginTop: 20 }]}>
              <Text style={{ color: "white" }}>
                {/* <Entypo name="wallet" size={14} color="black" /> */}
                {truncatedAddress}...
              </Text>
              <Pressable onPress={() => open()}>
                <Ionicons name="md-exit-outline" size={24} color="white" />
              </Pressable>
            </View>
            {/* <Account /> */}
            {bytecode === "" ? <NonEditableTextBox /> : <Account />}
          </>
        )}
      </View>
    </View>
  );
}

const mYstyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    height: '100%',
    width: "100%",
    backgroundColor: "rgba(19, 20, 21, 1)",
  },
  container2: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: '100%',
    borderRadius: 8,
    width: "90%",
    backgroundColor: "rgba(30, 31, 33, 1)",
  },
  textBox: {
    // width: '100%',
    height: 400,
    borderColor: "rgba(30, 31, 33, 1)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
});
