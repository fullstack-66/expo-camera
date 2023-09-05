import { create } from "zustand";
import { CameraCapturedPicture } from "expo-camera";
interface CameraStore {
  showCamera: boolean;
  setShowCamera: (showCamera: boolean) => void;
  picture: CameraCapturedPicture | null;
  setPicture: (picture: CameraCapturedPicture | null) => void;
}

const useCameraStore = create<CameraStore>((set) => ({
  showCamera: false,
  setShowCamera: (showCamera) => set({ showCamera }),
  picture: null,
  setPicture: (picture) => set({ picture }),
}));

export default useCameraStore;
