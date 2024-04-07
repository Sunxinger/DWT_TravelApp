import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native';
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

  console.log('Component rendering...'); // Debug log

  const pickImage = async () => {
    console.log('Requesting camera permissions...'); // Debug log
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("您拒绝了访问相机的请求！");
      return;
    }

    console.log('Launching camera...'); // Debug log
    const pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    setImage(pickerResult.uri);
  };

  const submitPost = async () => {
    console.log('Submitting post...'); // Debug log
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      image,
      createdAt: new Date().toISOString(),
    };

    try {
      const existingPosts = await AsyncStorage.getItem('posts');
      const posts = existingPosts ? JSON.parse(existingPosts) : [];
      posts.push(newPost);
      await AsyncStorage.setItem('posts', JSON.stringify(posts));
      
      Alert.alert('日志提交成功！');
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error saving post:', error);
      Alert.alert('提交错误，请稍后再试');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="标题"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="正文"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="选择图片" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity onPress={submitPost} style={styles.button}>
        <Text style={styles.buttonText}>提交日志</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default CreateBlogPost;
