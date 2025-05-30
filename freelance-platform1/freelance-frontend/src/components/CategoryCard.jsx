import React, { useState, useEffect } from "react";
import { getAllCategories, getCategoryById } from "../services/category";

const CategoryCard = ({ id }) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        let data;
        if (id) {
          // Si se proporciona un ID, obtener una categoría específica
          data = await getCategoryById(id);
          setCategory(data);
        } else {
          // Si no hay ID, obtener todas las categorías y mostrar la primera
          data = await getAllCategories();
          if (Array.isArray(data) && data.length > 0) {
            setCategory(data[0]);
          } else if (
            data.categories &&
            Array.isArray(data.categories) &&
            data.categories.length > 0
          ) {
            setCategory(data.categories[0]);
          } else {
            setError("No se encontraron categorías disponibles");
          }
        }
      } catch (err) {
        console.error("Error al obtener datos de la categoría:", err);
        setError("No se pudo cargar la información de la categoría");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  if (loading) {
    return (
      <div className="border rounded p-4 shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border rounded p-4 shadow bg-red-50">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="border rounded p-4 shadow bg-gray-50">
        <p className="text-gray-500 text-sm">No hay información disponible</p>
      </div>
    );
  }

  // Asegúrate de que todas las propiedades sean strings antes de renderizar
  const name =
    typeof category.name === "string"
      ? category.name
      : category.name && typeof category.name === "object"
      ? JSON.stringify(category.name)
      : "Sin nombre";

  const description =
    typeof category.description === "string" ? category.description : "";

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition text-center">
      {category.icon && <div className="text-3xl mb-2">{category.icon}</div>}
      <h3 className="text-lg font-semibold">{name}</h3>
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  );
};

export default CategoryCard;
