import { router } from "expo-router";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledIcon,
} from "../../utils/nativewind-styled";
import useCameraStore from "../../utils/cameraStore";

export default function App() {
  const [setPicture] = useCameraStore((state) => [state.setPicture]);
  const cameraRef = useRef<Camera>(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  // Use this to render camera when the screen is focused.
  const isFocused = useIsFocused();

  // Camera is still loading
  if (!cameraPermission) return <StyledView />;

  // Camera permissions are not granted yet
  if (!cameraPermission.granted) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText className="font-PromptRegular text-lg text-purple-800">
          We need your camera permission.
        </StyledText>
        <StyledTouchableOpacity
          onPress={requestCameraPermission}
          className="bg-purple-600 p-3 rounded-lg w-1/2 justify-center items-center mt-3"
        >
          <StyledText className="text-white font-PromptRegular">
            Grant Permission
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    if (!cameraRef.current) return;
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    try {
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPicture(newPhoto);
      router.push("/camera/review");
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  if (!isFocused) return <StyledView />;

  return (
    <StyledView className="flex-1">
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <StyledView className="flex-row bg-purple-400/75 p-3 rounded-lg">
          <StyledTouchableOpacity
            onPress={toggleCameraType}
            className="flex-1 justify-center  items-center"
          >
            <StyledIcon
              name="camera-reverse"
              size={30}
              className="text-white"
            />
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            onPress={takePicture}
            className="flex-1 items-center justify-center"
          >
            <StyledIcon
              name="add-circle-sharp"
              size={30}
              className="text-white"
            />
          </StyledTouchableOpacity>
        </StyledView>
      </Camera>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
});
