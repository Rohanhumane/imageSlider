import "./App.css";
import Slider from "./components/Slider";

function App() {
  return (
    <>
      <h1>Image Slider</h1>
      <main>
        <Slider
          urls={"https://picsum.photos/v2/list"}
          page={"1"}
          limit={"10"}
        ></Slider>
      </main>
    </>
  );
}

export default App;
