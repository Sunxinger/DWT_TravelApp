import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// 定义日志类型
interface Post {
  id: number; // 确保id被包括在类型定义中
  title: string;
  content: string;
  image?: string;
}

const ViewPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation(); // 使用useNavigation钩子

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await AsyncStorage.getItem('posts');
        if (postsData !== null) {
          setPosts(JSON.parse(postsData) as Post[]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (index: number) => {
    const newPosts = posts.filter((_, i) => i !== index);
    await AsyncStorage.setItem('posts', JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const sharePost = (post: Post) => {
    const message = `Check out this post: ${post.title}\n${post.content}`;
    // 使用Linking API发送短信
    Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
  };

  return (
    <ScrollView style={styles.container}>
      {posts.map((post, index) => (
        <View key={post.id.toString()} style={styles.postContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>{post.content}</Text>
          {/* 删除按钮 */}
          <Button title="Delete" onPress={() => deletePost(index)} />
          {/* 分享按钮 */}
          <Button title="Share via SMS" onPress={() => sharePost(post)} />
          {/* 编辑按钮，现在使用useNavigation进行页面跳转 */}
          <Button title="Edit" onPress={() => navigation.navigate('PostUpdate', { id: post.id })} />
        </View>
      ))}
    </ScrollView>
  );
};

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
  editButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: 'white',
  },
});

export default ViewPosts;
