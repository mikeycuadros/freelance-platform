import React from "react";
import { Button } from "../Button";

const SettingsTab = ({ 
  user, 
  formData, 
  handleChange, 
  handleUpdatePassword, 
  handleLogout, 
  setMessage 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Configuración</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Cambiar contraseña</h3>
        <form onSubmit={handleUpdatePassword}>
          <div className="mb-3">
            <label className="block text-gray-700 mb-2">
              Contraseña actual
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 mb-2">
              Nueva contraseña
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Confirmar nueva contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <Button type="submit">Actualizar contraseña</Button>
        </form>
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-medium mb-3">Cerrar sesión</h3>
        <p className="text-gray-600 mb-4">¿Deseas salir de tu cuenta?</p>
        <Button variant="danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default SettingsTab;