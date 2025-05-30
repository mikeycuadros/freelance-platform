import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">¡Ups!</h1>
      <p className="text-xl mb-2">Algo salió mal.</p>
      <p className="mb-6 text-gray-600">{error.statusText || error.message}</p>
      <Link to="/">
        <button className="bg-purple-800 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-900 transition">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
