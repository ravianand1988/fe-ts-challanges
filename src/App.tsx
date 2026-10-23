import { createRoot } from "react-dom/client";
import { AbstractComponentExample } from "./problems";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="top-nav" aria-label="top-nav">
        <h2>FE code challenges and example in React</h2>
      </div>
      <div className="side-bar" aria-label="side-bar"></div>
      <div className="content" aria-label="content">
        <AbstractComponentExample />
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
