import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user && user.roles && user.roles.includes("ROLE_ADMIN");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-purple-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="font-bold">FL</span>
            </div>
            <span className="text-xl font-bold text-purple-800">
              FreelancePro
            </span>
          </Link>

          {/* Botón de menú hamburguesa */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Enlaces de navegación para desktop */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/freelancer"
              className="text-gray-600 hover:text-purple-900"
            >
              Freelancers
            </Link>
            <Link
              to="/categories"
              className="text-gray-600 hover:text-purple-900"
            >
              Categorías
            </Link>
            <Link
              to="/how-works"
              className="text-gray-600 hover:text-purple-900"
            >
              Cómo funciona
            </Link>
          </div>

          {/* Botones de autenticación para desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-600 hover:text-purple-900"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/chats"
                  className="text-gray-600 hover:text-purple-900"
                >
                  Mensajes
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-purple-900"
                >
                  Perfil
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Iniciar sesión</Button>
                </Link>
                <Link to="/register">
                  <Button>Registrarse</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 pb-4`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/freelancer"
              className="text-gray-600 hover:text-purple-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Freelancers
            </Link>
            <Link
              to="/categories"
              className="text-gray-600 hover:text-purple-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categorías
            </Link>
            <Link
              to="/how-works"
              className="text-gray-600 hover:text-purple-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Cómo funciona
            </Link>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-600 hover:text-purple-900 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/chats"
                  className="text-gray-600 hover:text-purple-900 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mensajes
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-purple-900 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Perfil
                </Link>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Link 
                  to="/login"
                  className="block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link 
                  to="/register"
                  className="block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
