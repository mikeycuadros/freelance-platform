import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../services/category";
import { getAllFreelancers } from "../services/freelancer";
import { useFetch } from "../hooks/useFetch";
import CategoryIcon from "../components/CategoryIcon";
import Spinner from "../components/Spinner";
import Page from "../components/Page";

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
    <Page title="Inicio">
      <div className="min-h-screen flex flex-col">
        {/* Nueva sección Hero */}
        <section className="bg-gradient-to-br from-lavender-50 to-purple-50 py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Encuentra el talento{" "}
                <span className="text-purple-800 bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
                  freelance
                </span>{" "}
                perfecto para tu negocio
              </h1>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Conecta con profesionales de primera categoría para tus
                proyectos. Trabaja con freelancers talentosos para dar vida a
                tus ideas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/freelancer">
                  <Button className="text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200">
                    Buscar Talento
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200"
                  >
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
                  className="rounded-4xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-600">
                    Confiado por
                  </p>
                  <p className="font-bold text-xl text-purple-800">
                    +10,000 Empresas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías populares - Nuevo diseño */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
                Categorías Populares
              </h2>
              <Link
                to="/categories"
                className="text-purple-800 hover:text-purple-900 flex items-center group"
              >
                Ver todas las categorías
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform"
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

            <p className="text-gray-600 mb-10 text-lg">
              Explora talento por categoría y encuentra la combinación perfecta
              para las necesidades de tu proyecto
            </p>

            {loadingCategories || loadingFreelancers ? (
              <Spinner />
            ) : errorCategories ? (
              <p className="text-red-500 text-center">{errorCategories}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoriesWithFreelancerCount?.slice(0, 6).map((category) => (
                  <div
                    key={category.id}
                    className="block cursor-pointer group"
                    onClick={(e) => handleCategoryClick(e, category)}
                  >
                    <div className="bg-white hover:bg-gray-50 rounded-xl p-8 transition-all duration-300 border border-gray-100 hover:shadow-xl hover:border-purple-100">
                      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        <CategoryIcon type={category.icon} />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3 group-hover:text-purple-800 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-base mb-4">
                        {category.description || "Sin descripción"}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {category.freelancerCount || 0} freelancers
                        </span>
                        <span className="text-purple-800 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
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
        <section className="text-center py-20 bg-gradient-to-br from-purple-50 to-lavender-50">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
            ¿Listo para empezar?
          </h3>
          <Link to="/register">
            <Button className="text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200">
              Regístrate y empieza ahora
            </Button>
          </Link>
        </section>
      </div>
    </Page>
  );
};

export default Home;
