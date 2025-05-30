import React from "react";

const PersonalInfoTab = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
      <div>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Nombre:</span> {user?.username || user?.name || "Usuario"}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Correo:</span> {user?.email || "usuario@example.com"}
        </p>
      </div>
      
      {/* Puedes agregar más información de solo lectura aquí */}
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-500">
          Esta información no puede ser modificada. Si necesitas cambiar tus datos, por favor contacta al soporte.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
