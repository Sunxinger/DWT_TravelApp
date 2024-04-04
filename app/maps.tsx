import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Region } from 'react-native-maps';

const MapsScreen: React.FC = () => {
  // 定义初始区域
  const initialRegion: Region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        // 可以在此处添加更多MapView的props
      />
      {/* 可以在此处添加更多地图相关的组件 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapsScreen;
