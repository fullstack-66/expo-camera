import { Text, StyleSheet, View, Button, ScrollView } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import useCameraStore from "../../utils/cameraStore";
export default function Review() {
  const [picture, setShowCamera] = useCameraStore((state) => [
    state.picture,
    state.setShowCamera,
  ]);

  if (!picture) return <View />;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: picture.uri }}
        style={{ width: 200, height: 200, flex: 1 }}
        contentFit="cover"
      />
      <Button
        onPress={() => {
          setShowCamera(true);
          router.push("/camera");
        }}
        title="back"
      />
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
