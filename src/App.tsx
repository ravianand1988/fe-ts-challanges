import { createRoot } from "react-dom/client";
import "./App.css";
import { challengesRoutes } from "./routes";
import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import { Suspense } from "react";

const App = () => {
  return (
    <div className="app">
      <div className="top-nav" aria-label="top-nav">
        <h2>FE code challenges and example in React</h2>
      </div>
      <div className="side-bar" aria-label="side-bar">
        {
          challengesRoutes.map(({path, label}) => (
            <NavLink key={path} to={`/${path}`}>{label}</NavLink>
          ))
        }
      </div>
      <div className="content" aria-label="content">
        <Suspense fallback={<h3>Loading...</h3>}>
          <Routes>
            <Route index element={<em><b>Pick a challenge from the sidebar.</b></em>}></Route>
            {challengesRoutes.map(({path, Component}) => (
              <Route key={path} path={path} element={<Component />}></Route>
            ))}
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
