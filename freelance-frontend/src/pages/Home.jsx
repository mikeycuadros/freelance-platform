import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../services/category";
import { getAllFreelancers } from "../services/freelancer";
import { useFetch } from "../hooks/useFetch";
import CategoryIcon from "../components/CategoryIcon";

const Home = () => {
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetch(() => getAllCategories(), []);
  const navigate = useNavigate();

  const [categoriesWithFreelancerCount, setCategoriesWithFreelancerCount] =
    useState([]);
  const [loadingFreelancers, setLoadingFreelancers] = useState(true);

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
            const freelancerSkills = freelancer?.skills || [];

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

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    navigate(`/categories/${category.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nueva sección Hero */}
      <section className="bg-lavender-50 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-4">
              Encuentra el talento{" "}
              <span className="text-purple-800">freelance</span> perfecto para
              tu negocio
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Conecta con profesionales de primera categoría para tus proyectos.
              Trabaja con freelancers talentosos para dar vida a tus ideas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/freelancer">
                <Button className="text-lg px-6 py-3">Buscar Talento</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="text-lg px-6 py-3">
                  Soy Freelancer
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <img
                src="/hero-image.jpg"
                alt="Profesionales colaborando"
                className="rounded-4xl shadow-xl"
              />
              <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md">
                <p className="text-sm font-medium">Confiado por</p>
                <p className="font-bold">+10,000 Empresas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías populares - Nuevo diseño */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Categorías Populares</h2>
            <Link
              to="/categories"
              className="text-purple-800 hover:text-purple-900 flex items-center"
            >
              Ver todas las categorías
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <p className="text-gray-600 mb-8">
            Explora talento por categoría y encuentra la combinación perfecta
            para las necesidades de tu proyecto
          </p>

          {loadingCategories || loadingFreelancers ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg p-6 animate-pulse"
                >
                  <div className="h-12 w-12 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : errorCategories ? (
            <p className="text-red-500 text-center">{errorCategories}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesWithFreelancerCount?.slice(0, 6).map((category) => (
                <div
                  key={category.id}
                  className="block cursor-pointer"
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  <div className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 transition-all duration-300 border border-gray-100 hover:shadow-md">
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
        </div>
      </section>

      {/* CTA final */}
      <section className="text-center py-16">
        <h3 className="text-3xl font-semibold mb-4">¿Listo para empezar?</h3>
        <Link to="/register">
          <Button className="text-lg px-6 py-3">
            Regístrate y empieza ahora
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
