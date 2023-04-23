import { ref } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const MAX_NUM_FACE_MESH = 2;
export const MAX_NUM_HAND_DETECT = 1;
export const CAMERA_WIDTH = 440;
export const CAMERA_HEIGHT = 280;
export const MIN_DETECTION_CONFIDENT = 0.5;
export const MIN_TRACKING_CONFIDENT = 0.5;
export const HAND_MODEL_COMPLEXITY = 1;
export const POSE_MODEL_COMPLEXITY = 1;

export const gallerySquareListRef = ref(storage, "gallery/vuong");
export const galleryLongListRef = ref(storage, "gallery/dai");
export const galleryTallListRef = ref(storage, "gallery/cao");
export const galleryBigListRef = ref(storage, "gallery/bu");
