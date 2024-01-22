// Imports
// ========================================================
import { Text } from "react-native";
import { useAccount, useBlockNumber } from "wagmi";
import { styles } from "../App";

// Component
// ========================================================
export default function BlockNumber() {
  // Hooks
  const { isConnected } = useAccount();
  const { data, isError, isLoading } = useBlockNumber();

  // Return
  // if (!isConnected) return null;

  if (isLoading)
    return <Text style={{ marginBottom: 24 }}>Fetching block number...</Text>;

  if (isError)
    return (
      <Text style={{ marginBottom: 24 }}>Error fetching block number</Text>
    );

  return (
    <>
      <Text style={styles.textLabel}>Block Number</Text>
      <Text style={styles.textCode}>{data?.toString()}</Text>
    </>
  );
}
