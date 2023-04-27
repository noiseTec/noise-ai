import Webcam from "react-webcam";
import { cameraConfig } from "./WebcamConfig";
export const WebCamComponent = (props) => {
  const webcamRef = props.webcamRef;
  return <Webcam ref={webcamRef} style={cameraConfig} hidden={true} />;
};
