import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import MapView, { Region } from 'react-native-maps';

const MapsScreen: React.FC = () => {
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      />
      <View style={styles.searchBox}>
        <TextInput placeholder="Search here..." style={styles.input} />
      </View>
      <View style={styles.zoomButtons}>
        <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>
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
  searchBox: {
    position: 'absolute',
    marginTop: 40,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  input: {
    width: "85%",
    paddingLeft: 10,
  },
  zoomButtons: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  zoomButton: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
  },
  zoomText: {
    fontSize: 18,
    color: 'black',
  },
});

export default MapsScreen;
