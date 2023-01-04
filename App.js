import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(location.coords.latitude);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: location.coords.latitude ?? 0,
          longitude: location.coords.longitude ?? 0,
          latitudeDelta: 0.00005,
          longitudeDelta: 0.0021,
        }}
        style={styles.map}
        showsUserLocation={true}></MapView>
      <Text style={styles.errorText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
    position: 'absolute',
    bottom: 50,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
});
