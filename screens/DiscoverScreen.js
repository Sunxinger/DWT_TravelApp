// DiscoverScreen.js

import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatureTile from '../components/FeatureTile'; // 假设你已经创建了FeatureTile组件

const DiscoverScreen = () => {
  // 使用useNavigation Hook获取navigation对象
  const navigation = useNavigation();

  return (
    <View>
      {/* 假设FeatureTile是你用于显示各种功能磁贴的组件 */}
      <FeatureTile title="翻译" onPress={() => navigation.navigate('Translation')} />
      {/* 添加更多的FeatureTile以展示其他功能 */}
    </View>
  );
};

export default DiscoverScreen;
