// Imports
// ========================================================
import { W3mButton } from "@web3modal/wagmi-react-native";
import { View, StyleSheet } from "react-native";

// Component
// ========================================================
export default function Connect() {
  return (
    <>
      <View style={{ marginBottom: 24 }}>
        <W3mButton />
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
    backgroundColor: "black",
    marginTop: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});