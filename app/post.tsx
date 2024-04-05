import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CreateBlogPost({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // 询问用户权限
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("您拒绝了访问相机的请求！");
      return;
    }

    // 允许用户从库中选择图片或使用相机拍照
    const pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setImage(pickerResult.uri);
  };

  const submitPost = async () => {
    const postData = {
      title: title,
      content: content,
      image: image, // 假设这里是图片的URI或上传后的URL
    };
  
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (response.ok) {
        console.log('Post submitted successfully');
        alert('日志提交成功！');
        // 清空表单
        setTitle('');
        setContent('');
        setImage(null);
      } else {
        console.error('Failed to submit post');
        alert('提交失败，请稍后再试');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('提交错误，请检查网络连接并稍后再试');
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
}

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
