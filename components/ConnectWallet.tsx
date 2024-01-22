import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  Clipboard,
  StyleSheet,
  Pressable,
  Touchable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  http,
  Address,
  Hash,
  TransactionReceipt,
  createPublicClient,
  createWalletClient,
  custom,
  stringify,
} from "viem";

import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useSignMessage } from "wagmi";
import { myStyle } from "./CodeCompile";

export default function ConnectWallet() {
  const { open } = useWeb3Modal();
  // const [account, setAccount] = useState<Address>();

  const { address, isConnecting, isDisconnected } = useAccount();
  // const [addy, setAddy] = useState('0x')
  // const address = addy

  return (
    <>
      <View style={myStyle.compiled}>
        {address ? (
          <>
            <Pressable onPress={() => open()} style={styles.button}>
              <Text style={styles.text}>Show Wallet Details</Text>
            </Pressable>
          </>
        ) : (
          <>
            {/* <Text style={styles.mainText}>Open Connect Modal:</Text> */}
            <Pressable onPress={() => open()} style={styles.button}>
              <Text style={styles.text}>Connect Wallet</Text>
            </Pressable>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 8,
  },
  mainText: {
    // backgroundColor: "black",
    padding: 2,
    borderRadius: 5,
    margin: 2,
    color: "black",
  },
  mainButton: {
    backgroundColor: "black",
    // padding: 10,
    borderRadius: 5,
    // margin:10
  },
  mainButtonText: {
    color: "white",
  },
  secondaryButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    margin: 2,
  },
  secondaryButtonText: {
    color: "white",
    // margin: 5,
  },
  textr: {
    color: "black",
    marginTop: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#4444FF",
    marginTop: 3,
  },
  // button: {
  //   marginBottom: 24,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#4444FF",
  //   width: "90%",
  //   borderRadius: 8,
  // },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
