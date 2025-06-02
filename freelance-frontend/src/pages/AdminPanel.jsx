import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import CategoriesTab from "../components/admin/CategoriesTab";
import StatsTab from "../components/admin/StatsTab";

const AdminPanel = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("categories");
  const [stats, setStats] = useState({
    topMessageReceivers: [],
    topReviewReceivers: [],
    topRatedFreelancers: [],
  });

  // Verificar si el usuario es administrador
  useEffect(() => {
    if (!user || !user.roles.includes("ROLE_ADMIN")) {
      navigate("/");
    }
  }, [user, navigate]);

  // Cargar estadísticas
  useEffect(() => {
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

    fetchStats();
  }, [token]);

  return (
    <Page title="Panel de Administración">
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

        {/* Tabs de navegación */}
        <div className="flex space-x-1 border-b mb-6">
          <button
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors duration-200 ${
              activeTab === "categories"
                ? "bg-purple-50 border-b-2 border-purple-800 text-purple-800"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("categories")}
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                ></path>
              </svg>
              <span>Gestión de Categorías</span>
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors duration-200 ${
              activeTab === "stats"
                ? "bg-purple-50 border-b-2 border-purple-800 text-purple-800"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("stats")}
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                ></path>
              </svg>
              <span>Estadísticas</span>
            </div>
          </button>
        </div>

        {/* Contenido según la pestaña activa */}
        {activeTab === "categories" ? (
          <CategoriesTab token={token} />
        ) : (
          <StatsTab stats={stats} />
        )}
      </div>
    </Page>
  );
};

export default AdminPanel;
