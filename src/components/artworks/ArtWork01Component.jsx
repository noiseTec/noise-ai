import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
// import { Effects } from "@react-three/drei";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import DetectorComponent from "../detector/DetectorComponent";
const vertex = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 pixels;
float PI = 3.141592653589793238;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
const fragment = `
uniform float time;
uniform float progress;
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;


uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
void main()	{
	vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
	vec4 color = texture2D(uTexture,newUV);
	vec4 offset = texture2D(uDataTexture,vUv);
	gl_FragColor = vec4(vUv,0.0,1.);
	gl_FragColor = vec4(offset.r,0.,0.,1.);
	gl_FragColor = color;
	gl_FragColor = texture2D(uTexture,newUV - 0.02*offset.rg);
	// gl_FragColor = offset;

}
`;
function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}
// eslint-disable-next-line no-undef
extend({ GlitchPass });
const VideoComponent = () => {
  const setting = {
    grid: 15,
    mouse: 0.13,
    strength: 0.15,
    relaxtion: 0.9,
  };
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    vX: 0,
    vY: 0,
  });
  const [size, setSize] = useState(15);
  // const [texture, setTexture] = useState();
  const mesh = useRef();
  //setup texture
  let videoTexture = useMemo(() => {
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
    return new THREE.VideoTexture(video);
  }, []);
  videoTexture.needsUpdate = true;
  const uniforms = useMemo(
    () => ({
      time: {
        value: 0,
      },
      resolution: {
        value: new THREE.Vector4(),
      },
      uTexture: {
        value: videoTexture,
      },
      uDataTexture: {
        value: videoTexture,
      },
    }),
    [videoTexture]
  );
  const extensions = {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  };
  const width = setting.grid;
  const height = setting.grid;
  const data = new Float32Array(3 * setting.grid);
  for (let i = 0; i < setting.grid; i++) {
    let r = Math.random() * 255 - 125;
    let r1 = Math.random() * 255 - 125;
    const stride = i * 3;
    data[stride] = r;
    data[stride + 1] = r1;
    data[stride + 2] = r;
  }

  const texture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  if (texture) {
    texture.magFilter = texture.minFilter = THREE.NearestFilter;
  }
  if (texture) {
    let dataTexture = texture.image.data;
    for (let i = 0; i < dataTexture.length; i += 3) {
      dataTexture[i] *= setting.relaxtion;
      dataTexture[i + 1] *= setting.relaxtion;
    }
    let gridMouseX = size * mouse.x;
    let gridMouseY = size * (1 - mouse.y);

    let maxDist = size * setting.mouse;
    let aspect = 1080 / 1920;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let distance = (gridMouseX - i) ** 2 / aspect + (gridMouseY - j) ** 2;
        let maxDistSq = maxDist ** 2;
        if (distance < maxDistSq) {
          let index = 3 * (i + size * j);
          let power = maxDist / Math.sqrt(distance);
          power = clamp(power, 0, 10);
          dataTexture[index] += setting.strength * 100 * mouse.vX * power;
          dataTexture[index + 1] -= setting.strength * 100 * mouse.vY * power;
        }
      }
    }
    console.log(uniforms);
    texture.needsUpdate = true;
    if (uniforms && texture) {
      uniforms.uDataTexture.value = texture;
      uniforms.uDataTexture.value.needsUpdate = true;
    }
    console.log(uniforms);
  }
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: event.clientX / 1920,
        y: event.clientY / 1080,
        vX: mouse.x - mouse.prevX,
        vY: mouse.y - mouse.prevY,
        prevX: mouse.x,
        prevY: mouse.y,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse.prevX, mouse.prevY, mouse.x, mouse.y]);
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
      {/* <meshBasicMaterial map={videoTexture} />  */}
    </mesh>
  );
};
export const ArtWork01Component = () => {
  return (
    <>
      <DetectorComponent />
      <Canvas
        gl={{
          pixelRatio: Math.min(window.devicePixelRatio, 2),
        }}
      >
        {/* <Effects>
        <glitchPass attachArray="passes" />
      </Effects> */}
        <VideoComponent />
      </Canvas>
    </>
  );
};
