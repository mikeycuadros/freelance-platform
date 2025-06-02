import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user && user.roles && user.roles.includes("ROLE_ADMIN");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Función para determinar si un enlace está activo
  const isActiveLink = (pathname) => location.pathname === pathname;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center py-1">
            <img
              src="/logo.png"
              alt="Logo"
              className=" h-8 mr-2 object-cover"
            />
          </Link>

          {/* Enlaces de navegación para pantallas medianas y grandes */}
          <div className="hidden md:flex items-center justify-center flex-grow space-x-8 mx-4">
            <Link
              to="/freelancer"
              className={`
                text-gray-600 hover:text-purple-900
                ${
                  isActiveLink("/freelancer")
                    ? "border-b-2 border-purple-800 text-purple-800 font-semibold"
                    : ""
                }
                transition-colors duration-200
              `}
            >
              Buscar Talento
            </Link>
            <Link
              to="/categories"
              className={`
                text-gray-600 hover:text-purple-900
                ${
                  isActiveLink("/categories")
                    ? "border-b-2 border-purple-800 text-purple-800 font-semibold"
                    : ""
                }
                transition-colors duration-200
              `}
            >
              Categorias
            </Link>
            {isAuthenticated && (
              <Link
                to="/chats"
                className={`
                  text-gray-600 hover:text-purple-900 flex items-center
                  ${
                    isActiveLink("/chats")
                      ? "border-b-2 border-purple-800 text-purple-800 font-semibold"
                      : ""
                  }
                  transition-colors duration-200
                `}
              >
                Chats
              </Link>
            )}
          </div>

          {/* Botón de menú hamburguesa y elementos de autenticación */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`
                      text-gray-600 hover:text-purple-900
                      ${
                        isActiveLink("/admin")
                          ? "border-b-2 border-purple-800 text-purple-800 font-semibold"
                          : ""
                      }
                      transition-colors duration-200
                    `}
                  >
                    Panel de Administración
                  </Link>
                )}
                <Link
                  to="/profile"
                  className={`
                    text-gray-700 hover:text-purple-900 font-medium
                    ${
                      isActiveLink("/profile")
                        ? "border-b-2 border-purple-800 text-purple-800 font-semibold"
                        : ""
                    }
                    transition-colors duration-200
                  `}
                >
                  Mi perfil
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`
                    text-gray-700 hover:text-purple-900 font-medium
                    ${
                      isActiveLink("/login")
                        ? "border-b-2 border-purple-800 text-purple-800 font-semibold"
                        : ""
                    }
                    transition-colors duration-200
                  `}
                >
                  Iniciar Sesión
                </Link>
                <Link to="/register">
                  <Button className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-md">
                    Unirse
                  </Button>
                </Link>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 ml-4"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} pt-4`}>
          <div className="flex flex-col space-y-4">
            <Link
              to="/freelancer"
              className={`
                text-gray-600 hover:text-purple-900
                ${
                  isActiveLink("/freelancer")
                    ? "text-purple-800 font-semibold"
                    : ""
                }
                transition-colors duration-200
              `}
            >
              Buscar Talento
            </Link>
            <Link
              to="/categories"
              className={`
                text-gray-600 hover:text-purple-900
                ${
                  isActiveLink("/categories")
                    ? "text-purple-800 font-semibold"
                    : ""
                }
                transition-colors duration-200
              `}
            >
              Categorias
            </Link>
            {isAuthenticated && (
              <Link
                to="/chats"
                className={`
                  text-gray-600 hover:text-purple-900
                  ${
                    isActiveLink("/chats")
                      ? "text-purple-800 font-semibold"
                      : ""
                  }
                  transition-colors duration-200
                `}
              >
                Chats
              </Link>
            )}
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`
                      text-gray-600 hover:text-purple-900
                      ${
                        isActiveLink("/admin")
                          ? "text-purple-800 font-semibold"
                          : ""
                      }
                      transition-colors duration-200
                    `}
                  >
                    Panel de Administración
                  </Link>
                )}
                <Link
                  to="/profile"
                  className={`
                    text-gray-700 hover:text-purple-900 font-medium
                    ${
                      isActiveLink("/profile")
                        ? "text-purple-800 font-semibold"
                        : ""
                    }
                    transition-colors duration-200
                  `}
                >
                  Mi perfil
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`
                    text-gray-700 hover:text-purple-900 font-medium
                    ${
                      isActiveLink("/login")
                        ? "text-purple-800 font-semibold"
                        : ""
                    }
                    transition-colors duration-200
                  `}
                >
                  Iniciar Sesión
                </Link>
                <Link to="/register">
                  <Button className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-md w-full">
                    Unirse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
