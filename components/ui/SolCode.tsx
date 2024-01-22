import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";
import { useAppContext } from "../../context/AppContext";
import CodeCompile from "../CodeCompile";
import { styles } from "./CompileCode";
import { Feather } from "@expo/vector-icons";

export default function SolCode() {
  const { solidityCode, setSolidityCode } = useAppContext();

  const handleCodeChange = (code: string) => {
    setSolidityCode(code);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>

    <View style={styles.container}>
      <View style={[styles.buttonText2, { alignSelf: "flex-start" }]}>
        <Feather name="code" size={24} color="grey" />
        <Text style={[styles.buttonText]}>
          Solidity Code
        </Text>
      </View>

      <CodeEditor
        style={{
          ...{
            fontSize: 20,
            inputLineHeight: 26,
            highlighterLineHeight: 26,
            height: "100%",
            width: "100%",
            marginBottom: 10,
            backgroundColor: "rgba(19, 20, 21, 1)",
          },
        }}
        language="javascript"
        syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
        showLineNumbers
        initialValue={""}
        autoFocus={false}
        onChange={handleCodeChange}
      />
    </View>
    </TouchableWithoutFeedback>
  );
}
