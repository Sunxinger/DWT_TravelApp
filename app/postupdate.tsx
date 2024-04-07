import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const PostUpdate = () => {
  const [post, setPost] = useState({ id: '', title: '', content: '' });
  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    const loadPost = async () => {
      const postsData = await AsyncStorage.getItem('posts');
      const posts = postsData ? JSON.parse(postsData) : [];
      const foundPost = posts.find(p => p.id === id);
      if (foundPost) setPost(foundPost);
    };

    loadPost();
  }, [id]);

  // 实现保存逻辑...
};

// 添加样式...
