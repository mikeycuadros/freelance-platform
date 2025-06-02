import React from "react";
import { Button } from "../Button";

const PersonalInfoTab = ({ user }) => {
  return (
    <div className="space-y-6">
      {/* Información básica */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Información Básica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Nombre de usuario</p>
            <p className="font-medium text-gray-900">
              {user?.username || "Usuario"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Correo electrónico</p>
            <p className="font-medium text-gray-900">
              {user?.email || "usuario@example.com"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Rol</p>
            <p className="font-medium text-gray-900">
              {user?.roles?.includes("ROLE_FREELANCER")
                ? "Freelancer"
                : "Cliente"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Fecha de registro</p>
            <p className="font-medium text-gray-900">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "No disponible"}
            </p>
          </div>
        </div>
      </div>

      {/* Información de ayuda */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Información importante
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Esta información es de solo lectura y no puede ser modificada
                directamente. Si necesitas actualizar algún dato, por favor
                contacta con el administrador.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
