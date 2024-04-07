import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/HomeScreen'; // 首页组件，确保路径正确
import ViewPosts from './app/viewposts'; // 查看帖子列表的组件，确保路径正确
import PostUpdate from './app/postupdate'; // 更新帖子的组件，确保路径正确

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ViewPosts" component={ViewPosts} options={{ title: 'View Posts' }} />
        <Stack.Screen name="PostUpdate" component={PostUpdate} options={{ title: 'Update Post' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
