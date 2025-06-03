import React from "react";
import * as FaIcons from "react-icons/fa";

const CategoryIcon = ({ type }) => {
  // Función para obtener el color basado en el tipo
  const getColors = () => {
    return { bg: "bg-gray-100", text: "text-gray-600" };
  };

  // Convertir el nombre del icono a formato PascalCase para Font Awesome
  const getIconName = (type) => {
    return `Fa${type.charAt(0).toUpperCase() + type.slice(1)}`;
  };

  const iconName = getIconName(type);
  const Icon = FaIcons[iconName] || FaIcons.FaCode;
  const { bg, text } = getColors(type);

  return (
    <div
      className={`${bg} w-12 h-12 flex items-center justify-center rounded-md ${text}`}
    >
      <Icon className="h-6 w-6" />
    </div>
  );
};

export default CategoryIcon;
