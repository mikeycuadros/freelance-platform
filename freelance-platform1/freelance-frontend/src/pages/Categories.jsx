import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../services/category";
import { useFetch } from "../hooks/useFetch";
import { getAllFreelancers } from "../services/freelancer";
import CategoryIcon from "../components/CategoryIcon";
import { Button } from "../components/Button";

const Categories = () => {
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetch(() => getAllCategories(), []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoriesWithFreelancerCount, setCategoriesWithFreelancerCount] =
    useState([]);
  const [loadingFreelancers, setLoadingFreelancers] = useState(true);
  const navigate = useNavigate();

  // Obtener freelancers y contar cuántos pertenecen a cada categoría
  useEffect(() => {
    const fetchFreelancersAndCountByCategory = async () => {
      if (!categories) return;

      try {
        setLoadingFreelancers(true);
        // Obtener todos los freelancers
        const freelancers = await getAllFreelancers();

        // Mapear las categorías y contar freelancers para cada una
        const categoriesWithCount = categories.map((category) => {
          // Contar cuántos freelancers tienen habilidades que coinciden con esta categoría
          const count = freelancers.filter((freelancer) => {
            // Obtener las habilidades del freelancer
            const freelancerSkills = freelancer.skills || [];

            // Obtener las habilidades de la categoría
            const categorySkills = category.skills || [];

            // Verificar si hay al menos una habilidad que coincida exactamente
            return freelancerSkills.some((skill) =>
              categorySkills.some(
                (categorySkill) =>
                  skill.toLowerCase() === categorySkill.toLowerCase()
              )
            );
          }).length;

          // Devolver la categoría con el contador de freelancers
          return {
            ...category,
            freelancerCount: count,
          };
        });

        setCategoriesWithFreelancerCount(categoriesWithCount);
        setLoadingFreelancers(false);
      } catch (error) {
        console.error("Error al obtener freelancers:", error);
        setLoadingFreelancers(false);
      }
    };

    fetchFreelancersAndCountByCategory();
  }, [categories]);

  useEffect(() => {
    if (categoriesWithFreelancerCount.length > 0) {
      if (searchTerm.trim() === "") {
        setFilteredCategories(categoriesWithFreelancerCount);
      } else {
        const filtered = categoriesWithFreelancerCount.filter(
          (category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (category.description &&
              category.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        );
        setFilteredCategories(filtered);
      }
    }
  }, [categoriesWithFreelancerCount, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    navigate(`/categories/${category.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Todas las Categorías</h1>
          <p className="text-gray-600">
            Explora todas las categorías disponibles y encuentra profesionales
            especializados para tu proyecto
          </p>
        </div>

        {/* Buscador - Modificado para no ocupar todo el ancho */}
        <div className="mb-10 max-w-3xl">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
              type="text"
              placeholder="Buscar categorías..."
            />
            <Button type="submit" className="px-6">
              <svg
                className="w-5 h-5 mr-2 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Buscar
            </Button>
          </form>
        </div>

        {loadingCategories || loadingFreelancers ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 animate-pulse shadow-sm"
              >
                <div className="h-12 w-12 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : errorCategories ? (
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-red-600 text-center">
              Error al cargar las categorías: {errorCategories}
            </p>
          </div>
        ) : (
          <>
            {filteredCategories?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  No se encontraron categorías que coincidan con tu búsqueda.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCategories?.map((category) => (
                  <div
                    key={category.id}
                    className="block"
                    onClick={(e) => handleCategoryClick(e, category)}
                  >
                    <div className="bg-white hover:bg-gray-50 rounded-lg p-6 transition-all duration-300 border border-gray-100 hover:shadow-md cursor-pointer">
                      <div className="mb-4">
                        <CategoryIcon type={category.icon} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {category.description || "Sin descripción"}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {category.freelancerCount || 0} freelancers
                        </span>
                        <span className="text-purple-800 text-sm font-medium flex items-center">
                          Explorar
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
