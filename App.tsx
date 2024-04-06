// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewPosts from './app/viewposts';
import PostUpdate from './app/postupdate';
// 导入其他屏幕...

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ViewPosts" component={ViewPosts} />
        <Stack.Screen name="PostUpdate" component={PostUpdate} />
        {/* 注册其他屏幕... */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
