import { useRef, useEffect, useCallback } from "react";
import { Hands } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import {
  CAMERA_HEIGHT,
  CAMERA_WIDTH,
  HAND_MODEL_COMPLEXITY,
  MAX_NUM_HAND_DETECT,
  MIN_DETECTION_CONFIDENT,
  MIN_TRACKING_CONFIDENT,
} from "../../constants/appConstant";
import { drawCanvas } from "./utils/drawCanvas";
import { useDispatch } from "react-redux";
import { change } from "../../redux/slices/handPointSlice";
export const MediaPineHandDetect = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const resultsRef = useRef();
  let camera = null;
  const onResults = useCallback((results) => {
    if (canvasRef.current == null) return;
    if (webcamRef.current == null) return;
    const video = webcamRef.current["video"];
    const videoWidth = video["videoWidth"];
    const videoHeight = video["videoHeight"];
    canvasRef.current["width"] = videoWidth;
    canvasRef.current["height"] = videoHeight;
    resultsRef.current = results;
    if (canvasRef.current == null) return;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    const handLandmarks = results.multiHandLandmarks;
    if (handLandmarks.length > 0 && handLandmarks[0].length > 8) {
      const zoomX = Math.abs(handLandmarks[0][4].x - handLandmarks[0][8].x);
      const zoomY = Math.abs(handLandmarks[0][4].y - handLandmarks[0][8].y);
      const zoomPoint = zoomX > 0.1 ? zoomX : zoomY;
      dispatch(
        change({
          handPoint: { x: handLandmarks[0][4].x, y: handLandmarks[0][4].y },
          zoomPoint: zoomPoint,
        })
      );
    }
    drawCanvas(canvasCtx, results);
    if (canvasCtx == null) return;
  }, []);
  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: MAX_NUM_HAND_DETECT,
      modelComplexity: HAND_MODEL_COMPLEXITY,
      minDetectionConfidence: MIN_DETECTION_CONFIDENT,
      minTrackingConfidence: MIN_TRACKING_CONFIDENT,
    });

    hands.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current["video"], {
        onFrame: async () => {
          if (webcamRef.current == null) return;
          await hands.send({ image: webcamRef.current["video"] });
        },
        width: CAMERA_WIDTH,
        height: CAMERA_HEIGHT,
      });
      camera.start();
    }
  }, [onResults]);
  return [webcamRef, canvasRef];
};
