// Imports
// ========================================================
import { Text } from "react-native";
import { useNetwork, useAccount } from "wagmi";
import { styles } from "../App";

// Component
// ========================================================
export default function Network() {
  // Hooks
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  // Return
  if (!isConnected) return null;

  return (
    <>
      <Text style={styles.textLabel}>Network</Text>
      <Text style={styles.textCode}>{chain?.name}</Text>
      <Text style={styles.textLabel}>Chain ID</Text>
      <Text style={styles.textCode}>{chain?.id}</Text>
    </>
  );
}
