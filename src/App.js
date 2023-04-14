import { Provider } from "react-redux";
import "./App.css";
import { ArtWork01Component } from "./components/artwork01/ArtWork01Component";
import DetectorComponent from "./components/detector/DetectorComponent";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DetectorComponent />
        <ArtWork01Component />
      </div>
    </Provider>
  );
}

export default App;
