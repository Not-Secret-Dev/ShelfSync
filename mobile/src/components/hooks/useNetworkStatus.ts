import { useEffect, useState } from "react";
import * as Network from "expo-network";

export function useNetworkStatus() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let mounted = true;

    Network.getNetworkStateAsync().then((state) => {
      if (mounted) {
        setIsOffline(
          state.isConnected === false || state.isInternetReachable === false,
        );
      }
    });

    const subscription = Network.addNetworkStateListener((state) => {
      setIsOffline(
        state.isConnected === false || state.isInternetReachable === false,
      );
    });

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return isOffline;
}
