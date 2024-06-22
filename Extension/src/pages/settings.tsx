import { useEffect, useState } from "preact/hooks";
import { Route, Routes } from "react-router-dom";

import DataBases from "../components/databases";
import General from "../components/general";
import Loading from "../components/loading";
import NotFound from "./notFound";
import SettingsNav from "../components/settingsNav";
import { getPreference } from "../utils/database";
import { changeTheme } from "../utils/general";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(null);

  const handleTheme = () => {
    getPreference((data) => {
      if (theme !== data) {
        setTheme(data);
      }
    }, "theme");
  };
  useEffect(() => {
    handleTheme();
    const intervalId = setInterval(() => {
      handleTheme();
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (theme !== null) changeTheme(theme);
  }, [theme]);
  return (
    <>
      <SettingsNav />
      <main
        className={
          "w-calc-vw min-h-screen max-lg:w-full ml-auto px-16 pt-16 max-lg:px-10 max-sm:px-5 bg-white dark:bg-Charcoal"
        }
      >
        <Routes>
          <Route path="/general" element={<General />} />
          <Route
            path="/databases"
            element={<DataBases setLoading={setLoading} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Loading loading={loading} />
    </>
  );
};

export default Settings;
