import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCategoryById } from "../services/category";
import { getAllFreelancers } from "../services/freelancer";
import CategoryIcon from "../components/CategoryIcon";
import { Button } from "../components/Button";
import Spinner from "../components/Spinner";
import Page from "../components/Page";

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryAndFreelancers = async () => {
      try {
        setLoading(true);
        // Obtener detalles de la categoría
        const categoryData = await getCategoryById(id);
        setCategory(categoryData);

        // Obtener freelancers
        const allFreelancers = await getAllFreelancers();

        // Filtrar freelancers que coinciden con esta categoría
        const matchingFreelancers = allFreelancers.filter((freelancer) => {
          const freelancerSkills = freelancer.skills || [];
          const categorySkills = categoryData.skills || [];

          return freelancerSkills.some((skill) =>
            categorySkills.some(
              (categorySkill) =>
                skill.toLowerCase() === categorySkill.toLowerCase()
            )
          );
        });

        setFreelancers(matchingFreelancers);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError(
          "No se pudieron cargar los datos. Por favor, intenta de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    fetchCategoryAndFreelancers();
  }, [id]);

  const handleFreelancerClick = (freelancerId) => {
    navigate(`/freelancer/${freelancerId}`);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-red-600 text-center">{error}</p>
            <div className="text-center mt-4">
              <Button onClick={() => navigate("/categories")}>
                Volver a Categorías
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-yellow-600 text-center">
              No se encontró la categoría solicitada.
            </p>
            <div className="text-center mt-4">
              <Button onClick={() => navigate("/categories")}>
                Volver a Categorías
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Page title={category.name}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Botón para volver */}
          <div className="mb-6">
            <Button
              onClick={() => navigate("/categories")}
              className="flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Volver a Categorías
            </Button>
          </div>

          {/* Cabecera de la categoría */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-4 bg-purple-100 rounded-lg">
                <CategoryIcon type={category.icon} size="large" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                <p className="text-gray-600 mb-4">
                  {category.description || "Sin descripción"}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">
                    <strong>{freelancers.length}</strong> freelancers
                    disponibles
                  </span>
                  <span>
                    <strong>{category.skills?.length || 0}</strong> habilidades
                    relacionadas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Habilidades relacionadas */}
          {category.skills && category.skills.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Habilidades relacionadas
              </h2>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Freelancers en esta categoría */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Freelancers en {category.name}
            </h2>

            {freelancers.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">
                  No hay freelancers disponibles en esta categoría actualmente.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => navigate("/freelancer")}
                >
                  Ver todos los freelancers
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {freelancers.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleFreelancerClick(freelancer.id)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={`https://randomuser.me/api/portraits/${
                          freelancer.id % 2 === 0 ? "women" : "men"
                        }/${freelancer.id % 10 || 1}.jpg`}
                        alt={freelancer.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{freelancer.username}</h3>
                        <p className="text-sm text-gray-600">
                          {freelancer.freelancer?.title || "Freelancer"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center mb-3">
                      <span className="flex items-center text-yellow-500 mr-2">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {freelancer.freelancer?.reviews?.length > 0
                          ? (
                              freelancer.freelancer.reviews.reduce(
                                (sum, review) =>
                                  sum + parseFloat(review.rating),
                                0
                              ) / freelancer.freelancer.reviews.length
                            ).toFixed(1)
                          : "0.0"}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({freelancer.freelancer?.reviews?.length || 0} reseñas)
                      </span>
                      <span className="ml-auto font-semibold">
                        ${freelancer.freelancer?.hourlyRate || 30}/hr
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {(freelancer.freelancer?.skills || [])
                        .slice(0, 3)
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      {(freelancer.freelancer?.skills || []).length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          +{(freelancer.freelancer?.skills || []).length - 3}{" "}
                          más
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {freelancers.length > 0 && (
              <div className="mt-6 text-center">
                <Button
                  onClick={() =>
                    navigate("/freelancer", {
                      state: { categoryFilter: category.name },
                    })
                  }
                >
                  Ver todos los freelancers en {category.name}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CategoryDetail;
