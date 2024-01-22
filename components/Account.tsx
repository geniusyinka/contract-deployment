// Imports
// ========================================================
import { Text } from "react-native";
import { useAccount } from "wagmi";
import { styles } from "../App";

// Component
// ========================================================
export default function Acount() {
  // Hooks
  const { address, isConnected } = useAccount();

  // Return
  if (!isConnected) return null;

  return (
    <>
      <Text style={styles.textLabel}>Wallet Address</Text>
      <Text numberOfLines={1} style={styles.textCode}>
        {address}
      </Text>
    </>
  );
}
