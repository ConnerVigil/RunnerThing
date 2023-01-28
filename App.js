import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Button } from "react-native-web";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialFocus, setInitialFocus] = useState(true);

  setTimeout(() => {
    setInitialFocus(false);
  }, 3000);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={initialFocus}
      />
      <Text style={styles.errorText}>{text}</Text>
      <Button
        title="Focus"
        style={styles.focusButton}
        onPress={() => setInitialFocus(true)}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: "red",
    position: "absolute",
    bottom: 50,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  focusButton: {
    position: "absolute",
    bottom: 50,
    right: 50,
  },
});
