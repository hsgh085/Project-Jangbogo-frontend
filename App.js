import { NavigationContainer } from "@react-navigation/native";
import MemoMainScreen from "./src/screen/memo/MemoMainScreen";
import BottomTabNavigation from './src/navigations/BottomTabNavigation';

export default function App() {
  return (
    <NavigationContainer>
      {/* <MemoMainScreen /> */}
      <BottomTabNavigation/>
    </NavigationContainer>
  );
}
