import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from './screens/DiscoverScreen';
import TranslationScreen from './screens/TranslationScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Discover">
        <Stack.Screen name="Discover" component={DiscoverScreen} options={{ title: 'Discover' }} />
        <Stack.Screen name="Translation" component={TranslationScreen} options={{ title: 'Translation' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
