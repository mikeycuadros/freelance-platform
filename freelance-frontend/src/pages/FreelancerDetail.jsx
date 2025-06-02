import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFreelancerById } from "../services/freelancer";
import { findOrCreateChat } from "../services/chat";

// Importar los componentes de pestañas
import AboutTab from "../components/freelancer/AboutTab";
import PortfolioTab from "../components/freelancer/PortfolioTab";
import ReviewsTab from "../components/freelancer/ReviewsTab";
import SidebarInfo from "../components/freelancer/SidebarInfo";
import Spinner from "../components/Spinner";
import Page from "../components/Page";

const FreelancerDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("about");
  const [reviewMessage, setReviewMessage] = useState({ text: "", type: "" });

  const handleContactClick = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/freelancer/${id}` } });
    } else {
      try {
        // Verificar si ya existe un chat o crear uno nuevo
        const chat = await findOrCreateChat(user.id, person.userId.id);

        // Redirigir al chat
        navigate(`/chat/${chat.id}`);
      } catch (error) {
        console.error("Error al acceder al chat:", error);
      }
    }
  };

  const fetchPersonData = async () => {
    setLoading(true);
    try {
      // Obtener datos del freelancer desde la API
      const userData = await getFreelancerById(id);

      // Solo formatear lo necesario
      const formattedPerson = {
        // Datos que se usan directamente
        ...userData,
        // Datos que necesitan formateo
        rating:
          userData.reviews?.length > 0
            ? (
                userData.reviews.reduce(
                  (sum, review) => sum + parseFloat(review.rating),
                  0
                ) / userData.reviews.length
              ).toFixed(1)
            : "0.0",
        memberSince: userData.createdAt
          ? new Date(userData.createdAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Fecha desconocida",
        experience: userData.experiences
          ? userData.experiences.map((exp) => ({
              ...exp, // Mantener todos los datos originales
              period: `${new Date(exp.startDate).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "short",
              })} - ${
                exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                    })
                  : "Actual"
              }`,
            }))
          : [],
      };

      setPerson(formattedPerson);
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener datos de la persona:", err);
      setError("No se pudo cargar la información de la persona");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonData();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen px-6 py-10 bg-gray-50 flex justify-center items-center">
        <div className="bg-red-100 p-4 rounded-lg text-red-700 max-w-md text-center">
          <p className="font-bold mb-2">Error</p>
          <p>{error}</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Volver atrás
          </Button>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen px-6 py-10 bg-gray-50 flex justify-center items-center">
        <div className="bg-yellow-100 p-4 rounded-lg text-yellow-700 max-w-md text-center">
          <p>No se encontró información para esta persona</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Volver atrás
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Page title={person.userId?.username}>
      <div className="min-h-screen px-6 py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-purple-800 hover:text-purple-900 mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver
          </button>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            {/* Cabecera con información principal */}
            <div className="p-6 bg-white">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={`https://randomuser.me/api/portraits/${
                      person.id % 2 === 0 ? "women" : "men"
                    }/${person.id}.jpg`}
                    alt={person.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h1 className="text-2xl font-bold">
                        {person.userId?.username}
                      </h1>
                      <p className="text-gray-600">{person.title}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-gray-700">
                          {person.rating} · {person.reviewCount} reseñas
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {person.skills.map((skill, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 text-xs rounded-full ${
                              index === 0
                                ? "bg-purple-100 text-purple-800"
                                : index === 1
                                ? "bg-blue-100 text-blue-800"
                                : index === 2
                                ? "bg-pink-100 text-pink-800"
                                : index === 3
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-2xl font-bold text-purple-800">
                        ${person.hourlyRate}/hr
                      </p>
                      <div className="flex gap-2 mt-3">
                        {/* Mostrar el botón solo si el usuario está autenticado y no es su propio perfil */}
                        {isAuthenticated && user.id !== person.userId.id && (
                          <button
                            onClick={handleContactClick}
                            className="px-4 py-2 bg-purple-800 text-white rounded-md flex items-center justify-center hover:bg-purple-900"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                              />
                            </svg>
                            Enviar Mensaje
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pestañas de navegación */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`px-4 py-3 font-medium text-sm ${
                    activeTab === "about"
                      ? "border-b-2 border-purple-800 text-purple-800"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Acerca de
                </button>
                <button
                  onClick={() => setActiveTab("portfolio")}
                  className={`px-4 py-3 font-medium text-sm ${
                    activeTab === "portfolio"
                      ? "border-b-2 border-purple-800 text-purple-800"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Portafolio
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-3 font-medium text-sm ${
                    activeTab === "reviews"
                      ? "border-b-2 border-purple-800 text-purple-800"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reseñas
                </button>
              </nav>
            </div>

            {/* Contenido principal */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Columna principal */}
                <div className="md:col-span-2">
                  {activeTab === "about" && <AboutTab person={person} />}
                  {activeTab === "portfolio" && (
                    <PortfolioTab person={person} />
                  )}
                  {activeTab === "reviews" && (
                    <ReviewsTab
                      person={person}
                      isAuthenticated={isAuthenticated}
                      user={user}
                      id={id}
                      reviewMessage={reviewMessage}
                      setReviewMessage={setReviewMessage}
                      fetchPersonData={fetchPersonData}
                    />
                  )}
                </div>

                {/* Columna lateral */}
                <div>
                  <SidebarInfo person={person} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default FreelancerDetail;
