import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <Text>Discover today's destination</Text>
      <Link href={'/translate'} style={styles.link}>
        <Text style={styles.linkText}>Translate</Text>
      </Link>
      <Link href={'/maps'} style={styles.link}>
        <Text style={styles.linkText}>    Maps    </Text>
      </Link>
      <Link href={'/maps'} style={styles.link}>
        <Text style={styles.linkText}>    Maps    </Text>
      </Link>
      {/* 您可以在这里继续添加其他组件和内容 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1B95E0', // 这是示例颜色，您可以根据您的设计需求更改它
    borderRadius: 5,
    // 如果您希望有特定的宽度或其他布局样式，请在这里添加
  },
  linkText: {
    fontSize: 18,
    color: '#fff', // 文本颜色设置为白色
    // 根据需要添加其他文本样式
  },
  // 您可以在这里添加更多的样式定义
});
