import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error at:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-50 px-4 relative z-10"
      role="main"
      aria-label="Page Not Found - 404 Error"
    >
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-sm w-full text-center animate-slide-up">
        <img
          src="https://cdn.pixabay.com/photo/2024/09/06/06/24/monkey-9026690_1280.jpg"
          alt="Monkey stuck on stump with bananas"
          className="w-56 h-auto mx-auto mb-6"
        />
        <h1 className="text-5xl font-extrabold text-green-700 mb-2">404</h1>
        <p className="text-md text-gray-700 mb-6">
          Looks like this page is <strong>stumping</strong> our little monkey—
          <br />
          <span className="font-semibold text-green-600">
            {location.pathname}
          </span>{" "}
          can’t be found!
        </p>
        <a
          href="/"
          className="inline-block bg-green-600 text-white px-7 py-3 rounded-full text-lg font-semibold shadow hover:bg-green-700 transition"
          aria-label="Return Home"
        >
          Let’s Go Home 🏠
        </a>
      </div>
    </div>
  );
};

export default NotFound;
