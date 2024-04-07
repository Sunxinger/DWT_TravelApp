import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Route } from 'expo-router';
import ViewPosts from './app/viewposts';
import PostUpdate from './app/postupdate';
import HomeScreen from './app/HomeScreen';

export default function App() {
  return (
    <Router>
      <Route path="/" component={HomeScreen} />
      <Route path="/viewposts" component={ViewPosts} />
      <Route path="/postupdate/:id" component={PostUpdate} />
      {/* 其他页面的路由 */}
    </Router>
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
