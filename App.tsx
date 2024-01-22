// Imports
// ========================================================
import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { polygonMumbai } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { PrivateConfig } from "./private_config";
import CodeCompile from "./components/CodeCompile";
import { useKeyboard } from "@react-native-community/hooks";
import Navigation from "./components/Navigation";
import { AppProvider } from "./context/AppContext";

// Config
// ========================================================
// 1. Get projectId at https://cloud.walletconnect.com
const projectId = `${PrivateConfig.WALLET_CONNECT_PROJECT_ID}`;
console.log({ projectId });

// 2. Create config
const metadata = {
  name: "Web3Modal RN Expo",
  description: "Web3Modal RN Expo Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [polygonMumbai];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

// Main App Component
// ========================================================
export default function App() {
  const keyboard = useKeyboard();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      <AppProvider>
        <WagmiConfig config={wagmiConfig}>
          <Navigation />
          <Web3Modal />
        </WagmiConfig>
      </AppProvider>
    </TouchableWithoutFeedback>
  );
}

// Styles
// ========================================================
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },

  tab: {},
  scrollView: {
    marginHorizontal: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  textLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999",
    marginBottom: 12,
  },
  textCode: {
    backgroundColor: "#eee",
    fontSize: 16,
    fontFamily: "monospace",
    width: "90%",
    marginBottom: 24,
    textAlign: "center",
    padding: 10,
    // minHeight: 100
  },
  button: {
    marginBottom: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4444FF",
    width: "90%",
    borderRadius: 8,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    // margin: 'auto',
    height: 50,
  },
  deleteText: {
    color: "white",
    margin: 0,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  // inputContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   alignContent: "center",
  //   marginBottom: 10,
  //   width: "70%",
  //   margin: "auto",
  // },
});
