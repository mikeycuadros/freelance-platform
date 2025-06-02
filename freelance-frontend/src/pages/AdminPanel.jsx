import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/category";
import Spinner from "../components/Spinner";
import Page from "../components/Page";

const COLORS = [
  "#8884d8",
  "#83a6ed",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
];

const AdminPanel = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("categories");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "",
    description: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [stats, setStats] = useState({
    topMessageReceivers: [],
    topReviewReceivers: [],
    topRatedFreelancers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Verificar si el usuario es administrador
  useEffect(() => {
    if (!user || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/");
    }
  }, [user, navigate]);

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

    // Cargar estadísticas
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };

    fetchCategories();
    fetchStats();
  }, [token]);

  // Manejar creación de categoría
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const data = await createCategory(newCategory, token);
      setCategories([...categories, data]);
      setNewCategory({ name: "", icon: "", description: "" });
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

  return (
    <Page title="Panel de Administración">
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tabs de navegación */}
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 ${
              activeTab === "categories"
                ? "border-b-2 border-purple-800 text-purple-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("categories")}
          >
            Gestión de Categorías
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "stats"
                ? "border-b-2 border-purple-800 text-purple-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("stats")}
          >
            Estadísticas
          </button>
        </div>

        {/* Contenido según la pestaña activa */}
        {activeTab === "categories" ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Gestión de Categorías</h2>

            {/* Formulario para crear/editar categoría */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-semibold mb-3">
                {editingCategory ? "Editar Categoría" : "Crear Nueva Categoría"}
              </h3>
              <form
                onSubmit={
                  editingCategory ? handleUpdateCategory : handleCreateCategory
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={
                        editingCategory
                          ? editingCategory.name
                          : newCategory.name
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
                      Icono
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={
                        editingCategory
                          ? editingCategory.icon
                          : newCategory.icon
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
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    className="w-full p-2 border rounded"
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
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                  {editingCategory && (
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 rounded"
                      onClick={() => setEditingCategory(null)}
                    >
                      Cancelar
                    </button>
                  )}
                  <Button type="submit">
                    {editingCategory ? "Actualizar" : "Crear"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Lista de categorías */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Icono
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Descripción
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <Spinner />
                  ) : categories.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-4 text-center">
                        No hay categorías disponibles
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          {category.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm hidden sm:table-cell">
                          {category.icon}
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <div className="text-sm text-gray-900 truncate max-w-xs">
                            {category.description}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingCategory(category)}
                              className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
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
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Estadísticas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Gráfico de usuarios con más mensajes recibidos */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">
                  Usuarios con más mensajes
                </h3>
                {stats.topMessageReceivers.length === 0 ? (
                  <p className="text-gray-500">No hay datos disponibles</p>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={stats.topMessageReceivers}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="username"
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                          cursor={{ fill: "rgba(136, 132, 216, 0.1)" }}
                        />
                        <Legend wrapperStyle={{ paddingTop: "10px" }} />
                        <Bar
                          dataKey="messageCount"
                          name="Mensajes recibidos"
                          fill="#8884d8"
                          radius={[8, 8, 0, 0]}
                          barSize={40}
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Gráfico de usuarios con más reseñas */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">
                  Usuarios con más reseñas
                </h3>
                {stats.topReviewReceivers.length === 0 ? (
                  <p className="text-gray-500">No hay datos disponibles</p>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={stats.topReviewReceivers}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="username"
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                          cursor={{ fill: "rgba(130, 202, 157, 0.1)" }}
                        />
                        <Legend wrapperStyle={{ paddingTop: "10px" }} />
                        <Bar
                          dataKey="reviewCount"
                          name="Reseñas recibidas"
                          fill="#82ca9d"
                          radius={[8, 8, 0, 0]}
                          barSize={40}
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            {/* Gráfico de usuarios con mejor rating */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">
                Usuarios con mejor rating
              </h3>
              {stats.topRatedFreelancers.length === 0 ? (
                <p className="text-gray-500">No hay datos disponibles</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={stats.topRatedFreelancers}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="username"
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis domain={[0, 5]} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                          cursor={{ fill: "rgba(255, 198, 88, 0.1)" }}
                          formatter={(value) => [
                            parseFloat(value).toFixed(1),
                            "Calificación",
                          ]}
                        />
                        <Legend wrapperStyle={{ paddingTop: "10px" }} />
                        <Bar
                          dataKey="averageRating"
                          name="Calificación promedio"
                          fill="#ffc658"
                          radius={[8, 8, 0, 0]}
                          barSize={40}
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <Pie
                          data={stats.topRatedFreelancers}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, value, percent }) =>
                            `${name}: ${parseFloat(value).toFixed(1)} (${(
                              percent * 100
                            ).toFixed(0)}%)`
                          }
                          outerRadius={80}
                          innerRadius={40} // Añade un radio interno para crear un gráfico de dona
                          paddingAngle={5} // Añade espacio entre segmentos
                          dataKey="averageRating"
                          nameKey="username"
                          animationDuration={1500}
                          animationBegin={0}
                          animationEasing="ease-out"
                        >
                          {stats.topRatedFreelancers.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                              cornerRadius={4}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [
                            parseFloat(value).toFixed(1),
                            "Calificación",
                          ]}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                        />
                        <Legend
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          wrapperStyle={{ paddingLeft: "10px" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>

            {/* Lista de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {/* Usuarios con más mensajes recibidos */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">
                  Top usuarios por mensajes
                </h3>
                {stats.topMessageReceivers.length === 0 ? (
                  <p className="text-gray-500">No hay datos disponibles</p>
                ) : (
                  <ul className="space-y-2">
                    {stats.topMessageReceivers.map((user, index) => (
                      <li
                        key={user.id}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium">
                          {index + 1}. {user.username}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                          {user.messageCount} mensajes
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Usuarios con más reseñas */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">
                  Top usuarios por reseñas
                </h3>
                {stats.topReviewReceivers.length === 0 ? (
                  <p className="text-gray-500">No hay datos disponibles</p>
                ) : (
                  <ul className="space-y-2">
                    {stats.topReviewReceivers.map((user, index) => (
                      <li
                        key={user.id}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium">
                          {index + 1}. {user.username}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {user.reviewCount} reseñas
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Usuarios con mejor rating */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">
                  Top usuarios por rating
                </h3>
                {stats.topRatedFreelancers.length === 0 ? (
                  <p className="text-gray-500">No hay datos disponibles</p>
                ) : (
                  <ul className="space-y-2">
                    {stats.topRatedFreelancers.map((user, index) => (
                      <li
                        key={user.id}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium">
                          {index + 1}. {user.username}
                        </span>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>
                            {parseFloat(user.averageRating).toFixed(1)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default AdminPanel;
