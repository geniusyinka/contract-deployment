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
  SafeAreaView,
} from "react-native";
import { useKeyboard } from "@react-native-community/hooks";
import axios from "axios";
import CodeEditor, { 
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";
import { useAccount, useBlockNumber } from "wagmi";

import { styles } from "../App";
import { inherits } from "util";
import InputBox from "./utils/InputBox";
import { celo } from "viem/chains";
import { useAppContext } from "../context/AppContext";
import { Feather } from "@expo/vector-icons";

// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";

export default function CodeCompile() {
  const { isConnected } = useAccount();

  // const [solidityCode, setSolidityCode] = useState("");
  // const [bytecode, setBytecode] = useState("");
  const [abi, setAbi] = useState([]);
  const [constructorInputs, setConstructorInputs] = useState<string[]>([]);
  const { solidityCode, bytecode, setBytecode } = useAppContext();
  const [compiling, setCompiling] = useState(false);

  const keyboard = useKeyboard();

  const handleAddInput = () => {
    const newInputs = [...constructorInputs, ""]; // Add a new empty input
    setConstructorInputs(newInputs);
  };

  const handleDeleteInput = (index: number) => {
    const newInputs = [...constructorInputs];
    newInputs.splice(index, 1); // Remove the input at the specified index
    setConstructorInputs(newInputs);
  };

  const handleDeleteAllInputs = () => {
    setConstructorInputs([]); // Resetting the inputs to an empty array
  };

  const copyBytecodeToClipboard = () => {
    Clipboard.setString(bytecode);
    Alert.alert("Copied", "Bytecode copied to clipboard");
  };

  const copyAbiToClipboard = () => {
    Clipboard.setString(renderedAbiAsString);
    Alert.alert("Copied", "Bytecode copied to clipboard");
  };

  // const clearSolidityCode = () => {
  //   Alert.alert(
  //     "Clear Solidity Code",
  //     "Are you sure you want to clear the Solidity code?",
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Clear",
  //         onPress: () => setSolidityCode(""),
  //       },
  //     ],
  //   );
  // };

  const clearBytecode = () => {
    Alert.alert(
      "Clear Bytecode",
      "Are you sure you want to clear the Bytecode?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: () => setBytecode(""),
        },
      ],
    );
  };

  const compileAndFetchBytecode = async () => {
    try {
      setCompiling(true); // Set state to true when compilation starts
      setBytecode("");
      const response = await axios.post(
        "https://5452-102-89-22-16.ngrok-free.app",
        {
          name: "contract.sol", // Assuming the name for the Solidity code is 'contract.sol'
          content: solidityCode,
        },
      );

      const { abi, bytecode } = response.data;

      // Update state with the received bytecode
      setBytecode(bytecode);
      setAbi(abi);
      console.log("abi..", typeof abi);
    } catch (error) {
      console.error("Error compiling code:", error);
      // Handle error scenarios here
    } finally {
      setCompiling(false);
    }
  };
  // if (!isConnected) return null;

  const RenderAbiData = ({ abi }) => {
    return (
      <View>
        {abi.map((item, index) => (
          <View key={index}>
            {Object.entries(item).map(([key, value], i) => (
              <View key={i}>
                <Text>{key}: </Text>
                <Text>{String(value)}</Text>
              </View>
            ))}
            {/* Add additional styling or separators if needed */}
          </View>
        ))}
      </View>
    );
  };

  const renderAbiToString = (abiData) => {
    return abiData
      .map((item, index) => {
        const objectString = Object.entries(item)
          .map(([key, value]) => {
            if (typeof value === "string") {
              return `"${key}": "${value}"`;
            } else {
              return `"${key}": ${value}`;
            }
          })
          .join(", ");
        return `{${objectString}}`;
      })
      .join(",\n\n");
  };

  const renderedAbiAsString = renderAbiToString(abi);

  return (
    <>
      <View style={myStyle.compiled}>
        {/* <InputBox
          value="0.8.4+commit1234"
          style={}
        /> */}
        <View style={[myStyle.address, { marginTop: 20 }]}>
          <Text style={{ color: "grey" }}>0.8.4+commit1234</Text>
        </View>
        <Pressable onPress={compileAndFetchBytecode} style={styles.button}>
          <Text style={{ color: "white", lineHeight: 48, fontWeight: "500" }}>
            {compiling ? "Compiling..." : "Compile Code"}
          </Text>
        </Pressable>
        {bytecode !== "" && (
          <>
            <View style={myStyle.detail}>
              <Text style={{ color: "rgba(213, 213, 213, 1)" }}>Bytecode</Text>
              {bytecode !== "" && (
                <Pressable onPress={copyBytecodeToClipboard}>
                  <Feather name="copy" size={24} color="black" />
                </Pressable>
              )}
            </View>
            <InputBox
              style={{
                // backgroundColor: "red",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderWidth: 0,
                color: "rgba(213, 213, 213, 1)",
                fontFamily: 'Courier' 
              }}
              value={bytecode ? `${bytecode.slice(0, 2000)}...` : ""}
            />
            <View style={myStyle.detail}>
              <Text style={{ color: "rgba(213, 213, 213, 1)" }}>ABI</Text>
              {bytecode !== "" && (
                <Pressable onPress={copyAbiToClipboard}>
                  <Feather name="copy" size={24} color="black" />
                </Pressable>
              )}
            </View>
            <InputBox
              style={{
                // backgroundColor: "red",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderWidth: 0,
                color: "rgba(213, 213, 213, 1)",
                height: 200, borderColor: 'gray', fontFamily: 'Courier' 

              }}
              value={renderedAbiAsString}
            />
          </>
        )}
      </View>

      {/* {bytecode !== "" && (
        <Button title="Copy Bytecode" onPress={copyBytecodeToClipboard} />
      )} */}

      {/* <TextInput
          style={styles.textInput2}
          placeholder="Bytecode"
          // value={solidityCode}
          onChangeText={(text) => setSolidityCode(text)}
        /> */}
    </>
  );
}

export const myStyle = StyleSheet.create({
  compiled: {
    // flex: 1,
    // marginTop: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    color: "white",
    backgroundColor: "#131415",
    height: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: "70%",
    margin: "auto",
  },
  buttonText: {
    color: "#3E2400",
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 48,
  },
  address: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E1F21",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    marginBottom: 7,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E1F21",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "90%",
    padding: 10,
    marginBottom: 2,
  },

  //   textInput2: {
  //     flex: 1,
  //     borderWidth: 1,
  //     borderColor: "#ccc",
  //     borderRadius: 5,
  //     padding: 10,
  //     marginRight: 10,
  //     width: "70%",
  //     height: 20,
  //   },
  //   deleteButton: {
  //     padding: 10,
  //     backgroundColor: "red",
  //     borderRadius: 5,
  //     // margin: 'auto',
  //     height: 50,
  //   },
  //   deleteText: {
  //     color: "white",
  //     margin: 0,
  //     textAlign: "center",
  //     alignContent: "center",
  //     alignItems: "center",
  //   },

  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     padding: 20,
  //     backgroundColor: "#fff",
  //   },
  //   codeInput: {
  //     borderWidth: 1,
  //     borderColor: "#ccc",
  //     borderRadius: 5,
  //     padding: 10,
  //     marginTop: 20,
  //     marginBottom: 10,
  //     minHeight: 100,
  //     width: "100%",
  //   },
  //   textInput4: {
  //     borderWidth: 1,
  //     borderColor: "#ccc",
  //     borderRadius: 5,
  //     padding: 10,
  //     marginTop: 20,
  //     marginBottom: 10,
  //     minHeight: 10,
  //     width: "100%",
  //   },
  //   resultLabel: {
  //     marginTop: 10,
  //     fontWeight: "bold",
  //   },
  //   resultText: {
  //     borderWidth: 1,
  //     borderColor: "#ccc",
  //     borderRadius: 5,
  //     padding: 10,
  //     marginBottom: 10,
  //     minHeight: 50,
  //     width: "100%",
  //   },
  //   button: {
  //     alignItems: "center",
  //     justifyContent: "center",
  //     paddingVertical: 12,
  //     paddingHorizontal: 32,
  //     borderRadius: 4,
  //     elevation: 3,
  //     backgroundColor: "black",
  //     marginTop: 3,
  //   },
  //   text: {
  //     fontSize: 16,
  //     lineHeight: 21,
  //     fontWeight: "bold",
  //     letterSpacing: 0.25,
  //     color: "white",
  //   },
  //   mainText: {
  //     // backgroundColor: "black",
  //     padding: 2,
  //     borderRadius: 5,
  //     margin: 2,
  //     color: "black",
  //   },
});
