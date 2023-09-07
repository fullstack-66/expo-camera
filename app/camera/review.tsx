import useCameraStore from "../../utils/cameraStore";
import * as MediaLibrary from "expo-media-library";
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledIcon,
  StyledImageBackground,
} from "../../utils/nativewind-styled";
import { router } from "expo-router";

export default function Review() {
  const [picture, setPicture] = useCameraStore((state) => [
    state.picture,
    state.setPicture,
  ]);
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  if (!mediaPermission || !picture) return <StyledView />;
  if (!mediaPermission.granted) {
    // Media permissions are not granted yet
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText className="font-Prompt-Regular text-lg text-purple-800">
          We need your media permission.
        </StyledText>
        <StyledTouchableOpacity
          onPress={requestMediaPermission}
          className="bg-purple-600 p-3 rounded-lg w-1/2 justify-center items-center mt-3"
        >
          <StyledText className="text-white font-Prompt-Regular">
            Grant Permission
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    );
  }

  function savePhoto() {
    MediaLibrary.saveToLibraryAsync(picture!.uri).then(() => {
      setPicture(null);
      alert("Photo Saved");
      router.push("/camera");
    });
  }

  return (
    <StyledView className="flex-1 p-6">
      <StyledView className="flex-1 rounded-2xl overflow-hidden">
        <StyledImageBackground
          source={{ uri: picture.uri }}
          className="flex-1 h-full justify-end"
        >
          <StyledView className="flex-row bg-purple-400/75 p-3 rounded-lg">
            <StyledTouchableOpacity
              className="flex-1 justify-center items-center"
              onPress={savePhoto}
            >
              <StyledIcon
                name="save-outline"
                size={30}
                className="text-white"
              />
            </StyledTouchableOpacity>
          </StyledView>
        </StyledImageBackground>
      </StyledView>
    </StyledView>
  );
}
