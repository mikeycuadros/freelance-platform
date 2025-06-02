import React from "react";
import { Button } from "../Button";

const SettingsTab = ({
  formData,
  handleChange,
  handleUpdatePassword,
  handleLogout,
}) => {
  return (
    <div className="space-y-6">
      {/* Cambio de contraseña */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña actual
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
            <p className="mt-1 text-sm text-gray-500">
              La contraseña debe tener al menos 8 caracteres
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar nueva contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            Actualizar contraseña
          </Button>
        </form>
      </div>

      {/* Cerrar sesión */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Cerrar sesión</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Al cerrar sesión, tendrás que volver a iniciar sesión para acceder a
            tu cuenta.
          </p>
          <Button
            variant="danger"
            onClick={handleLogout}
            className="w-full sm:w-auto"
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
