import noiseLogo from "../../assets/logo.png";

class DisplayImage {
  constructor(path, backgroundColor, particleColor) {
    this.path = path;
    this.backgroundColor = backgroundColor;
    this.particleColor = particleColor;
  }
}

let whiteHexColor = "#FFFFFF";
let blackHexColor = "#000000";

// Set up an image gallery
export const logoImage = new DisplayImage(
  noiseLogo,
  blackHexColor,
  whiteHexColor
);
