import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouting } from 'expo-router';

const PostUpdate = () => {
  const [post, setPost] = useState({ id: '', title: '', content: '' });
  const { params } = useRouting(); // 获取路由参数

  useEffect(() => {
    const postId = params?.postId;
    // 从本地存储获取数据并更新状态
    const fetchPost = async () => {
      const storedPosts = await AsyncStorage.getItem('posts');
      const posts = storedPosts ? JSON.parse(storedPosts) : [];
      const currentPost = posts.find(p => p.id === postId);
      if (currentPost) {
        setPost(currentPost);
      }
    };

    fetchPost();
  }, [params?.postId]);

  const handleSave = async () => {
    // 保存逻辑，将更新的 post 保存到 AsyncStorage
    try {
      const storedPosts = await AsyncStorage.getItem('posts');
      let posts = storedPosts ? JSON.parse(storedPosts) : [];
      const postIndex = posts.findIndex(p => p.id === post.id);
      if (postIndex !== -1) {
        posts[postIndex] = post;
        await AsyncStorage.setItem('posts', JSON.stringify(posts));
        params.goBack(); // 使用 params 中的 goBack 方法返回到之前的屏幕
      }
    } catch (error) {
      // 错误处理
      console.error('Failed to save the post', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Post Title:</Text>
      <TextInput
        style={styles.input}
        value={post.title}
        onChangeText={text => setPost({...post, title: text})}
      />
      <Text style={styles.label}>Post Content:</Text>
      <TextInput
        style={[styles.input, styles.contentInput]}
        value={post.content}
        onChangeText={text => setPost({...post, content: text})}
        multiline
      />
      <Button title="Save Post" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  contentInput: {
    height: 150,
    textAlignVertical: 'top',
  },
});

export default PostUpdate;
