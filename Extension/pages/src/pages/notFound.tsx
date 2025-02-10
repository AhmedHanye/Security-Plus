import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="center flex-col gap-5 h-screen">
      <h1 className="text-9xl font-extrabold text-blue-500">404</h1>
      <h2 className="text-5xl font-bold">Something's missing.</h2>
      <p className="text-lg text-muted-foreground">
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.
      </p>
      <Link
        to="/"
        className="rounded-md text-lg px-4 py-2.5 font-bold bg-blue-500 hover:bg-blue-600 text-white"
        replace
      >
        Back to home
      </Link>
    </main>
  );
};

export default NotFound;
