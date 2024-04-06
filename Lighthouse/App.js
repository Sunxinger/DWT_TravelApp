import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewPosts from './app/viewposts'; // 确保您有这个文件
import PostUpdate from './app/postupdate'; // 确保您有这个文件
import HomeScreen from './app/HomeScreen'; // 假设您也有这个文件

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 注册 HomeScreen */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        {/* 注册 ViewPosts */}
        <Stack.Screen name="ViewPosts" component={ViewPosts} options={{ title: 'View Posts' }} />
        {/* 注册 PostUpdate */}
        <Stack.Screen name="PostUpdate" component={PostUpdate} options={{ title: 'Edit Post' }} />
      </Stack.Navigator>
      <View style={styles.container}>
        {/* 保留原有的内容 */}
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
