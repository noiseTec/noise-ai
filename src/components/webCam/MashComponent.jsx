import { cameraConfig } from "./WebcamConfig";

export const MashComponent = (props) => {
  const canvasRef = props.canvasRef;
  return (
    <canvas
      ref={canvasRef}
      className="output_canvas"
      style={cameraConfig}
      hidden={true}
    ></canvas>
  );
};
