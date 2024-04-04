// TranslateScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const TranslateScreen = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const translateText = async () => {
    // 调用Google翻译API的URL和API密钥（假设）
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
      <Button title="Translate" onPress={translateText} />
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
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default TranslateScreen;
