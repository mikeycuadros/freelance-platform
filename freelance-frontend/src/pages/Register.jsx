import React, { useState } from "react";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    roles: "freelancer",
    password: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Aplicar trim() solo a ciertos campos
    if (name === 'email' || name === 'password' || name === 'confirmPassword') {
      setForm({ ...form, [name]: value.trim() });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRolesChange = (e) => {
    setForm({ ...form, roles: e.target.value });
  };

  const togglePasswordVisibility = (inputId) => {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!acceptTerms) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    try {
      const result = await register({
        username: form.username,
        email: form.email,
        roles: form.roles,
        password: form.password,
      });

      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Error al registrarse");
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      setError("Error de conexión. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Crea tu cuenta</h1>

        <p className="text-center mb-8">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-purple-800 hover:text-purple-900">
            Inicia sesión
          </Link>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block font-medium mb-2">Nombre completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="username"
                placeholder="Tu nombre completo"
                value={form.username}
                onChange={handleChange}
                className="pl-10 w-full py-3 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="nombre@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                className="pl-10 w-full py-3 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Tipo de cuenta</label>
            <div className="relative">
              <select
                name="roles"
                value={form.roles}
                onChange={handleRolesChange}
                className="w-full py-3 pl-4 pr-10 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              >
                <option value="freelancer">
                  Freelancer - Ofrecer servicios
                </option>
                <option value="client">Cliente - Contratar servicios</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Puedes cambiar esto más adelante en tu perfil.
            </p>
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="pl-10 w-full py-3 border border-gray-300 rounded"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Al menos 8 caracteres, incluyendo mayúsculas y números.
            </p>
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="********"
                value={form.confirmPassword}
                onChange={handleChange}
                className="pl-10 w-full py-3 border border-gray-300 rounded"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Acepto los{" "}
                <Link
                  to="/terms"
                  className="text-purple-800 hover:text-purple-900 hover:underline"
                >
                  términos y condiciones
                </Link>{" "}
                y la{" "}
                <Link
                  to="/privacy"
                  className="text-purple-800 hover:text-purple-900 hover:underline"
                >
                  política de privacidad
                </Link>
              </span>
            </label>
          </div>

          <Button type="submit" className="w-full py-3 text-lg">
            Crear Cuenta
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
