import { createRoot } from "react-dom/client";
import { AbstractComponentExample } from "./problems";

const App = () => {
  return (
    <div>
      <div aria-label="top-nav">
        <h2>FE code challenges and example in React</h2>
      </div>
      <div area-label="side-bar"></div>
      <div area-label="content">
        <AbstractComponentExample />
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
