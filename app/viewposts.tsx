import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 定义日志类型
interface Post {
  title: string;
  content: string;
  image?: string;
}

const ViewPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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
        <View key={index} style={styles.postContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>{post.content}</Text>
          <Link href={`/postupdate/${post.id}`} style={styles.link}>
            <Text style={styles.linkText}>Edit</Text>
          </Link>
          <Button title="Delete" onPress={() => deletePost(index)} />
          <Button title="Share via SMS" onPress={() => sharePost(post)} />
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
});

export default ViewPosts;
