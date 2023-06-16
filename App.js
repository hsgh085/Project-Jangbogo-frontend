import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootApp from "./src/RootApp";
import { TokenContext } from './src/contexts/TokenContext';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay_splash() {
  await SplashScreen.preventAutoHideAsync();
  await sleep(3000);
  await SplashScreen.hideAsync();
}

export default function App() {
  const tokenState = useState();
  delay_splash();
  return (
    <SafeAreaProvider>
      <TokenContext.Provider value={tokenState}>
        <RootApp />
      </TokenContext.Provider>
    </SafeAreaProvider>
  );
}
