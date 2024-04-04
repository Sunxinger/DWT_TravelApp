// App.js 文件
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Discover from './app/(tabs)/discover';
import TranslateScreen from './screens/TranslateScreen'; // 确保路径正确

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="TranslationScreen" component={TranslateScreen} />
        {/* 添加其他屏幕配置 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
