import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Effects } from "@react-three/drei";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { useSelector } from "react-redux";
import { Vector2, Color } from "three";
import { easing } from "maath";
import DetectorComponent from "../detector/DetectorComponent";
// eslint-disable-next-line no-undef
extend({ GlitchPass });
const VideoComponent = () => {
  const mesh = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  const updateMousePosition = useCallback((e) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

  const video = document.createElement("video");
  video.src = "/artwork1.mp4";
  video.autoplay = true;
  video.loop = true;
  document.addEventListener(
    "click",
    () => {
      video.play();
    },
    { once: true }
  );
  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.needsUpdate = true;
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_bg: {
        value: new Color("#A1A3F7"),
      },
      u_colorA: { value: new Color("#9FBAF9") },
      u_colorB: { value: new Color("#FEB3D9") },
    }),
    []
  );
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);
    console.log(mousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  const extensions = {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  };
  return (
    <mesh ref={mesh} scale={1.5}>
      <planeGeometry args={[10, 5]} />
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms}
        extensions={extensions}
        side={THREE.DoubleSide}
        wireframe={false}
      />
      <meshBasicMaterial map={videoTexture} />
    </mesh>
  );
};
export const ArtWork01Component = () => {
  function Rig({ radius = 20 }) {
    const positionPoint = useSelector((state) => state.handPoint);
    useEffect(() => {}, [positionPoint]);
    useFrame((state, dt) => {
      easing.damp3(
        state.camera.position,
        [
          Math.sin(state.pointer.x) * radius,
          Math.atan(state.pointer.y) * radius,
          Math.cos(state.pointer.x) * radius,
        ],
        0.9,
        dt
      );
      state.camera.lookAt(0, 0, 0);
    });
  }
  return (
    <Canvas
      gl={{
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      }}
    >
      {/* <Rig /> */}
      <Effects>
        <glitchPass attachArray="passes" />
      </Effects>
      <VideoComponent />
    </Canvas>
  );
};
