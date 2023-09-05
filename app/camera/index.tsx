import { router } from "expo-router";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import useCameraStore from "../../utils/cameraStore";
export default function App() {
  const [setPicture] = useCameraStore((state) => [state.setPicture]);
  const cameraRef = useRef<Camera>(null);
  // const [hasCameraPermission, setHasCameraPermission] = useState();
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  // const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [shouldHide, setShouldHide] = useState(false);
  useFocusEffect(() => {
    setShouldHide(false);
    return () => {
      setShouldHide(true);
    };
  });
  // const [showCamera, setShowCamera] = useState(true);

  console.log({ cameraPermission, mediaPermission });

  if (!cameraPermission || !mediaPermission) {
    // Camera permissions are still loading
    return shouldHide ? null : <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet
    return shouldHide ? null : (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  if (!mediaPermission.granted) {
    // Camera permissions are not granted yet
    return shouldHide ? null : (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the media
        </Text>
        <Button onPress={requestMediaPermission} title="grant permission" />
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

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    // cameraRef.current.pausePreview();
    setPicture(newPhoto);
    // setShowCamera(false);
    router.push("/camera/review");
    // setPhoto(newPhoto);
  }

  // if (!showCamera && photo?.uri) {
  //   return (
  //     <View style={styles.container}>
  //       <Image
  //         source={{ uri: photo.uri }}
  //         style={{ width: 200, height: 200, flex: 1 }}
  //         contentFit="cover"
  //       />
  //       <TouchableOpacity
  //         style={styles.button}
  //         onPress={() => setShowCamera(true)}
  //       >
  //         <Text style={styles.text}>Flip Camera</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return shouldHide ? null : (
    <View style={styles.container}>
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
