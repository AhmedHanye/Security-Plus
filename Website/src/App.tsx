import Home from "./pages/home";
import Docs from "./pages/docs";
import About from "./pages/about";

import Navbar from "./components/navbar";

import { HashRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  return (
    <>
      <Navbar currentPage={currentPage} />
      <main
        className={
          "bg-slate-300 text-black dark:bg-slate-800 dark:text-white transition-colors duration-300"
        }
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <HashRouter>
            <Routes>
              <Route
                path="/"
                element={<Home setCurrentPage={setCurrentPage} />}
              />
              <Route
                path="/documentation"
                element={<Docs setCurrentPage={setCurrentPage} />}
              />
              <Route
                path="/about"
                element={<About setCurrentPage={setCurrentPage} />}
              />
            </Routes>
          </HashRouter>
        </div>
      </main>
    </>
  );
};

export default App;
