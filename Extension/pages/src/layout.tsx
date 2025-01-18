import { lazy } from "react";
import { Outlet } from "react-router-dom";

const Navbar = lazy(() => import("./components/navbar"));

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="h-[calc(100vh-2rem)] max-md:h-[calc(100vh-3.5rem)] sm:ps-16 px-4 max-sm:py-5">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
