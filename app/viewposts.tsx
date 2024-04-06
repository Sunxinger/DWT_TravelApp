// viewposts.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// 定义日志类型
interface Post {
  id: string;  // 确保你的 Post 接口包含 id 属性
  title: string;
  content: string;
  image?: string;
}

const ViewPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation(); // 使用 useNavigation 钩子

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await AsyncStorage.getItem('posts');
        if (postsData !== null) {
          setPosts(JSON.parse(postsData));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (postId: string) => {
    // 删除逻辑，根据 postId 删除对应的日志
  };

  const editPost = (postId: string) => {
    // 导航到 PostUpdate 屏幕，并传递 postId 参数
    navigation.navigate('PostUpdate', { postId });
  };

  const sharePost = (post: Post) => {
    // 分享逻辑...
  };

  return (
    <ScrollView style={styles.container}>
      {posts.map((post, index) => (
        <View key={post.id} style={styles.postContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>{post.content}</Text>
          <Button title="Edit" onPress={() => editPost(post.id)} />
          <Button title="Delete" onPress={() => deletePost(post.id)} />
          <Button title="Share via SMS" onPress={() => sharePost(post)} />
        </View>
      ))}
    </ScrollView>
  );
};

// 样式...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
  },
});

export default ViewPosts;
