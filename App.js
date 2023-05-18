import { SafeAreaProvider } from 'react-native-safe-area-context';
import Onboarding from './src/screen/onboarding/Onboarding';
import * as SplashScreen from 'expo-splash-screen';
 
function sleep (ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
 
async function delay_splash() {
    await SplashScreen.preventAutoHideAsync();
    await sleep(3000);
    await SplashScreen.hideAsync();    
};

export default function App() {
  delay_splash()
  return (
    <SafeAreaProvider>
      <Onboarding/>
    </SafeAreaProvider>
  );
}