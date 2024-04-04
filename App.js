import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Discover from './app/(tabs)/discover';
import AnotherPage from './screens/TranslateScreen.js'; // 另一个页面的路径

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="AnotherPage" component={AnotherPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
