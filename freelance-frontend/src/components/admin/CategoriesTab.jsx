import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import Spinner from "../Spinner";
import { toast } from "sonner";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category";

const CategoriesTab = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "",
    description: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Error al cargar las categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Manejar creación de categoría
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const data = await createCategory(newCategory, token);
      setCategories([...categories, data]);
      setNewCategory({ name: "", icon: "", description: "" });
      setIsFormVisible(false);
      toast.success("Categoría creada exitosamente");
    } catch (error) {
      toast.error("Error al crear la categoría");
    }
  };

  // Manejar actualización de categoría
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(editingCategory.id, editingCategory, token);
      const updatedCategories = categories.map((cat) =>
        cat.id === editingCategory.id ? editingCategory : cat
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      toast.success("Categoría actualizada exitosamente");
    } catch (error) {
      toast.error("Error al actualizar la categoría");
    }
  };

  // Manejar eliminación de categoría
  const handleDeleteCategory = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")
    ) {
      try {
        await deleteCategory(id, token);
        setCategories(categories.filter((cat) => cat.id !== id));
        toast.success("Categoría eliminada exitosamente");
      } catch (error) {
        toast.error("Error al eliminar la categoría");
      }
    }
  };

  // Filtrar categorías según el término de búsqueda
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Barra superior con búsqueda y botón de nueva categoría */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="w-full sm:w-96">
          <input
            type="text"
            placeholder="Buscar categorías..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {searchTerm
              ? `Mostrando ${filteredCategories.length} de ${categories.length} categorías`
              : `Total: ${categories.length} categorías`}
          </span>
          <Button
            onClick={() => {
              setIsFormVisible(!isFormVisible);
              setEditingCategory(null);
              setNewCategory({ name: "", icon: "", description: "" });
            }}
            className="w-full sm:w-auto"
          >
            {isFormVisible ? "Cancelar" : "Nueva Categoría"}
          </Button>
        </div>
      </div>

      {/* Formulario para crear/editar categoría */}
      {(isFormVisible || editingCategory) && (
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
          <h3 className="text-xl font-semibold mb-4 text-purple-800">
            {editingCategory ? "Editar Categoría" : "Crear Nueva Categoría"}
          </h3>
          <form
            onSubmit={
              editingCategory ? handleUpdateCategory : handleCreateCategory
            }
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={
                    editingCategory ? editingCategory.name : newCategory.name
                  }
                  onChange={(e) =>
                    editingCategory
                      ? setEditingCategory({
                          ...editingCategory,
                          name: e.target.value,
                        })
                      : setNewCategory({
                          ...newCategory,
                          name: e.target.value,
                        })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icono (emoji o código)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={
                    editingCategory ? editingCategory.icon : newCategory.icon
                  }
                  onChange={(e) =>
                    editingCategory
                      ? setEditingCategory({
                          ...editingCategory,
                          icon: e.target.value,
                        })
                      : setNewCategory({
                          ...newCategory,
                          icon: e.target.value,
                        })
                  }
                  placeholder="Ej: 🎨 o fa-paint-brush"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows="3"
                value={
                  editingCategory
                    ? editingCategory.description
                    : newCategory.description
                }
                onChange={(e) =>
                  editingCategory
                    ? setEditingCategory({
                        ...editingCategory,
                        description: e.target.value,
                      })
                    : setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                }
                placeholder="Describe brevemente esta categoría..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setEditingCategory(null);
                  setIsFormVisible(false);
                }}
              >
                Cancelar
              </button>
              <Button type="submit">
                {editingCategory ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de categorías */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Icono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Descripción
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4">
                    <div className="flex justify-center">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "No se encontraron categorías que coincidan con la búsqueda"
                      : "No hay categorías disponibles"}
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {category.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <span className="text-2xl">{category.icon}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {category.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setIsFormVisible(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTab;
