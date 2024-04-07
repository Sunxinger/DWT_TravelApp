import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, RouteProp } from '@react-navigation/native';

// 定义此屏幕接收的参数类型
type PostUpdateParamList = {
  PostUpdate: {
    id: number;
  };
};

// 使用RouteProp来定义route.params的类型
type PostUpdateRouteProp = RouteProp<PostUpdateParamList, 'PostUpdate'>;

const PostUpdate = () => {
  const [post, setPost] = useState({ id: '', title: '', content: '' });
  const route = useRoute<PostUpdateRouteProp>();
  // 直接使用id时，通过类型断言确保其为number类型
  const { id } = route.params;

  useEffect(() => {
    const loadPost = async () => {
      const postsData = await AsyncStorage.getItem('posts');
      const posts = postsData ? JSON.parse(postsData) : [];
      // 使用id时确保其类型正确
      const foundPost = posts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
      }
    };

    loadPost();
  }, [id]);

  // 更新帖子的逻辑
  const updatePost = async () => {
    const newPost = { ...post, id, title: post.title, content: post.content };
    const postsData = await AsyncStorage.getItem('posts');
    let posts = postsData ? JSON.parse(postsData) : [];
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
      posts[postIndex] = newPost;
      await AsyncStorage.setItem('posts', JSON.stringify(posts));
      // 提示用户更新成功，并进行其他逻辑处理，如返回上一页
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPost({ ...post, title: text })}
        value={post.title}
        placeholder="Post Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPost({ ...post, content: text })}
        value={post.content}
        placeholder="Post Content"
        multiline
      />
      <Button title="Update Post" onPress={updatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default PostUpdate;
