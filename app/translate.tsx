import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

const TranslateScreen = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const translateText = async () => {
    setIsLoading(true);
    // 注意：请替换为您的实际API密钥
    const url = `https://translation.googleapis.com/language/translate/v2?key=AIzaSyB-ROOjVyQT4-RFawmTytDlVmkmma55rTI`;
    const data = {
      q: text,
      source: 'en',
      target: 'zh',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setTranslatedText(result.data.translations[0].translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter text to translate"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.button} onPress={translateText}>
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Translate</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.result}>{translatedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // 轻微的背景色
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#333', // 结果文字颜色
  },
});

export default TranslateScreen;
