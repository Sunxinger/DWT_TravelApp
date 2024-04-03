import { View as RNView, StyleSheet, TouchableOpacity, Text as RNText } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo'; // 确保路径正确
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';


// 功能按钮组件
const FeatureTile = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <Text style={styles.tileText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Discover页面主组件
const DiscoverScreen = ({ navigation }) => { // 从props中解构navigation
  return (
    <View style={styles.container}>
      <FeatureTile title="翻译" onPress={() => navigation.navigate('Translation')} />
      <FeatureTile title="地图" onPress={() => console.log('地图')} />
      <FeatureTile title="天气" onPress={() => console.log('天气')} />
      <FeatureTile title="货币转换" onPress={() => console.log('货币转换')} />
      {/* 根据需要添加更多功能按钮 */}
    </View>
  );
};

// 样式表
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  tile: {
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    width: '40%', // 根据需要调整
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  tileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DiscoverScreen;