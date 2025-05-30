import React from "react";

const SidebarInfo = ({ person }) => {
  return (
    <div className="bg-gray-50 p-5 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">Miembro desde</p>
        <p>{person.memberSince}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">Email</p>
        <p>{person.userId?.email}</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Sitio web</p>
        <a
          href={`https://${person.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-800 hover:underline"
        >
          {person.website}
        </a>
      </div>
    </div>
  );
};

export default SidebarInfo;
