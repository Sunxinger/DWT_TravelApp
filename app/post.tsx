import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
}

const CreateBlogPost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("您拒绝了访问相机的请求！");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setImage(pickerResult.uri);
  };

  const submitPost = async () => {
    const newPost: Post = {
      id: Date.now(),
      title: title,
      content: content,
      image: image,
      createdAt: new Date().toISOString(),
    };

    try {
      const existingPosts = await AsyncStorage.getItem('posts');
      const posts = existingPosts ? JSON.parse(existingPosts) : [];
      posts.push(newPost);
      await AsyncStorage.setItem('posts', JSON.stringify(posts));
      
      alert('日志提交成功！');
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error saving post:', error);
      alert('提交错误，请稍后再试');
    }
  };

  return (
    <View style={styles.container}>
      {/* 省略了输入和按钮部分的代码以简化 */}
    </View>
  );
};

export default CreateBlogPost;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    margin: 20,
  },
});
