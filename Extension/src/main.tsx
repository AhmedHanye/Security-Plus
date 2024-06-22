import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import "./index.css";
import { App } from "./pages/app.tsx";
import Block from "./pages/block.tsx";
import Settings from "./pages/settings.tsx";
import NotFound from "./pages/notFound.tsx";


ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blocked" element={<Block />} />
      <Route path="/settings/*" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>,
  document.getElementById("root")!
);
