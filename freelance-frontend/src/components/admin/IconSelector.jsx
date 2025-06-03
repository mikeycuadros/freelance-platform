import React, { useState, useMemo } from "react";
import * as FaIcons from "react-icons/fa";

const IconSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener todos los iconos disponibles de Font Awesome
  const availableIcons = useMemo(() => {
    return Object.keys(FaIcons)
      .filter((key) => key.startsWith("Fa"))
      .map((key) => key.replace("Fa", ""));
  }, []);

  const filteredIcons = availableIcons.filter((icon) =>
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (icon) => {
    onChange(icon);
    setIsOpen(false);
    setSearchTerm("");
  };

  const renderIcon = (iconName) => {
    const IconComponent = FaIcons[`Fa${iconName}`];
    if (!IconComponent) {
      return <FaIcons.FaQuestion className="w-4 h-4" />;
    }
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          <>
            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded">
              {renderIcon(value)}
            </div>
            <span className="text-sm">{value}</span>
          </>
        ) : (
          <span className="text-sm text-gray-500">Seleccionar icono</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-[32rem] mt-1 bg-white border rounded-lg shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Buscar icono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="max-h-[32rem] overflow-y-auto p-2">
            <div className="grid grid-cols-8 gap-3">
              {filteredIcons.map((icon) => (
                <div
                  key={icon}
                  className="flex flex-col items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleSelect(icon)}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded mb-1">
                    {renderIcon(icon)}
                  </div>
                  <span className="text-xs text-center break-words max-w-[4rem]">
                    {icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconSelector;
