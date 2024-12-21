import { HashRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("./layout"));
const ThemeSwitch = lazy(() => import("./components/themeSwitch"));
const Loading = lazy(() => import("./components/loading"));

const SecurityCheck = lazy(() => import("./pages/securityCheck"));
const DataBase = lazy(() => import("./pages/dataBase"));
const Settings = lazy(() => import("./pages/settings"));

const Checker = lazy(() => import("./pages/checker"));
const Blocked = lazy(() => import("./pages/blocked"));
const NotFound = lazy(() => import("./pages/notFound"));

// TODO: add animations to pages using gsap
// TODO: add a way to tell the user if the domain or page is blocked when going to `checker page` OR `blocked page`
// TODO: use react portals with iframes in the `checker page` to prevent the iframe from rerendering when drag and drop
// TODO: add import and export rules for the `dataBase page` using csv files

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/check/:url" element={<Checker />} />
        <Route path="/block/:url" element={<Blocked />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<SecurityCheck />} />
          <Route path="/database" element={<DataBase />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ThemeSwitch />
      <Loading />
    </HashRouter>
  );
};

export default App;
