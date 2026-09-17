import { useEffect, useState } from "react";
import { ApolloProvider as ApolloClientProvider } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import LoadingScreen from "@/components/indicators/loadingScreen/loading";
import { reportError } from "@/lib/monitoring";
import { apolloClient, apolloCache } from "./client";

interface ApolloProviderProps {
  children: React.ReactNode;
}

/**
 * Restores the cache from disk before the tree renders.
 *
 * Buvio is used on pitches and in changing rooms - the socket layer's own
 * comments talk about tunnels and lifts - and until now a cold start without
 * signal showed an error on every screen, because `cache-and-network` had an
 * empty cache to serve from. Persisting it means the last known standings and
 * history are readable offline.
 *
 * Only the cache is persisted, never the session: tokens live in the secure
 * store. `maxSize` caps the file so a long history cannot grow without bound.
 */
const MAX_CACHE_BYTES = 1024 * 1024 * 5;

export const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    let cancelled = false;

    persistCache({
      cache: apolloCache,
      storage: new AsyncStorageWrapper(AsyncStorage),
      maxSize: MAX_CACHE_BYTES,
    })
      .catch((error) => {
        // A cache that will not restore is a cold start, not a broken app.
        reportError(error, "apollo-cache-persist");
      })
      .finally(() => {
        if (!cancelled) {
          setIsRestored(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!isRestored) {
    return <LoadingScreen />;
  }

  return (
    <ApolloClientProvider client={apolloClient}>
      {children}
    </ApolloClientProvider>
  );
};

export default ApolloProvider;
