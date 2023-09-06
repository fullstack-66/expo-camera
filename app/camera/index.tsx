import { router } from "expo-router";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import * as MediaLibrary from "expo-media-library";
import useCameraStore from "../../utils/cameraStore";
export default function App() {
  const [setPicture, showCamera, setShowCamera] = useCameraStore((state) => [
    state.setPicture,
    state.showCamera,
    state.setShowCamera,
  ]);
  const cameraRef = useRef<Camera>(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const isFocused = useIsFocused();

  console.log({ isFocused });
  console.log({ ref: cameraRef.current });
  console.log({ cameraPermission, mediaPermission });

  // Camera is still loading
  if (!cameraPermission) return <View />;

  // Camera permissions are not granted yet
  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>We need your permission.</Text>
        <Button onPress={requestCameraPermission} title="Requst Camera" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePic() {
    if (!cameraRef.current) return;
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    try {
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPicture(newPhoto);
      setShowCamera(false);
      router.push("/camera/review");
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  if (!isFocused) return <View />;
  return (
    <View style={styles.container}>
      <Text>Camera</Text>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePic}>
            <Text style={styles.text}>Take</Text>
          </TouchableOpacity>

          <Text>Hello</Text>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
