/* eslint-disable react-hooks/exhaustive-deps */
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import vertex from "./shader/vertex.glsl";
// import fragment from "./shader/fragment.glsl";
// import { useCallback, useEffect, useMemo, useRef } from "react";
// import { useSelector } from "react-redux";
// import { Vector2, Color } from "three";
// import { easing } from "maath";
// const VideoComponent = () => {
//   const mesh = useRef();
//   const mousePosition = useRef({ x: 0, y: 0 });
//   const updateMousePosition = useCallback((e) => {
//     mousePosition.current = { x: e.pageX, y: e.pageY };
//   }, []);

//   const video = document.createElement("video");
//   video.src = "/artwork2.mp4";
//   video.autoplay = true;
//   video.loop = true;
//   document.addEventListener(
//     "click",
//     () => {
//       video.play();
//     },
//     { once: true }
//   );
//   const videoTexture = new THREE.VideoTexture(video);
//   videoTexture.needsUpdate = true;
//   const uniforms = useMemo(
//     () => ({
//       u_time: {
//         value: 0.0,
//       },
//       u_mouse: { value: new Vector2(0, 0) },
//       u_bg: {
//         value: new Color("#A1A3F7"),
//       },
//       u_colorA: { value: new Color("#9FBAF9") },
//       u_colorB: { value: new Color("#FEB3D9") },
//     }),
//     []
//   );
//   useEffect(() => {
//     window.addEventListener("mousemove", updateMousePosition, false);
//     console.log(mousePosition);
//     return () => {
//       window.removeEventListener("mousemove", updateMousePosition, false);
//     };
//   }, [updateMousePosition]);

//   const extensions = {
//     derivatives: "#extension GL_OES_standard_derivatives : enable",
//   };
//   return (
//     <mesh ref={mesh} scale={1.5}>
//       <planeGeometry args={[10, 5]} />
//       <shaderMaterial
//         fragmentShader={fragment}
//         vertexShader={vertex}
//         uniforms={uniforms}
//         extensions={extensions}
//         side={THREE.DoubleSide}
//         wireframe={false}
//       />
//       <meshBasicMaterial map={videoTexture} />
//     </mesh>
//   );
// };
// export const ArtWork02Component = () => {
//   function Rig({ radius = 20 }) {
//     const positionPoint = useSelector((state) => state.handPoint);
//     useEffect(() => {}, [positionPoint]);
//     useFrame((state, dt) => {
//       easing.damp3(
//         state.camera.position,
//         [
//           Math.sin(state.pointer.x) * radius,
//           Math.atan(state.pointer.y) * radius,
//           Math.cos(state.pointer.x) * radius,
//         ],
//         0.9,
//         dt
//       );
//       state.camera.lookAt(0, 0, 0);
//     });
//   }
//   return (
//     <Canvas
//       gl={{
//         pixelRatio: Math.min(window.devicePixelRatio, 2),
//       }}
//     >
//       {/* <Rig /> */}
//       <VideoComponent />
//     </Canvas>
//   );
// };
import { useEffect, useRef } from "react";
import SketchAw3 from "../sketches/SketchAw3";
import p5 from "p5";
import { Hands } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { useState } from "react";

export default function ArtWork05Component() {
  // create a reference to the container in which the p5 instance should place the canvas
  const p5ContainerRef = useRef();

  const webCamRef = useRef(null);
  var camera = null;
  const [corX, setCorX] = useState(0);
  const [corY, setCorY] = useState(0);

  function onResults(result) {
    // console.log(result)
    if (result.multiHandLandmarks.length > 0) {
      setCorX(result.multiHandLandmarks[0][8].x * window.innerWidth);
      setCorY(result.multiHandLandmarks[0][8].y * window.innerHeight);
      localStorage.setItem(
        "corX",
        result.multiHandLandmarks[0][8].x * window.innerWidth
      );
      localStorage.setItem(
        "corY",
        result.multiHandLandmarks[0][8].y * window.innerHeight
      );
    }
  }
  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    if (typeof webCamRef !== "undefined" && webCamRef.current !== null) {
      camera = new cam.Camera(webCamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webCamRef.current.video });
        },
        width: 400,
        height: 400,
      });
      camera.start();
    }
    // On component creation, instantiate a p5 object with the sketch and container reference
    const p5Instance = new p5(SketchAw3, p5ContainerRef.current);
    // On component destruction, delete the p5 instance
    return () => {
      p5Instance.remove();
    };
  }, []);
  return (
    <>
      <Webcam
        hidden={true}
        ref={webCamRef}
        style={{
          position: "absolute",
          width: window.innerWidth,
          height: window.innerHeight,
        }}
      />
      <div className="Artwork3" ref={p5ContainerRef}></div>
    </>
  );
}
