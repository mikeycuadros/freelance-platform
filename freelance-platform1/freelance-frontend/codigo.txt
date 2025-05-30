import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { Button } from "../components/Button";
import Pagination from "../components/Pagination";
import { Link, useNavigate } from "react-router-dom";

const Freelancer = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(
    "Cualquier Experiencia"
  );
  const [priceRange, setPriceRange] = useState(150);

  // Datos de ejemplo para freelancers
  const allFreelancers = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Desarrollador Full Stack",
      rating: 4.9,
      reviews: 124,
      successRate: 98,
      location: "San Francisco, CA",
      hourlyRate: 85,
      skills: ["React", "Node.js", "TypeScript"],
    },
    {
      id: 2,
      name: "Jessica Miller",
      title: "Diseñadora UI/UX",
      rating: 4.8,
      reviews: 98,
      successRate: 96,
      location: "Londres, UK",
      hourlyRate: 75,
      skills: ["Figma", "UI Design", "User Research"],
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      title: "Desarrollador Frontend",
      rating: 4.7,
      reviews: 87,
      successRate: 95,
      location: "Madrid, España",
      hourlyRate: 65,
      skills: ["React", "Vue.js", "CSS"],
    },
    {
      id: 4,
      name: "Laura Martínez",
      title: "Especialista en Marketing Digital",
      rating: 4.9,
      reviews: 112,
      successRate: 97,
      location: "Barcelona, España",
      hourlyRate: 70,
      skills: ["SEO", "SEM", "Social Media"],
    },
    {
      id: 5,
      name: "David Wang",
      title: "Desarrollador Backend",
      rating: 4.8,
      reviews: 76,
      successRate: 94,
      location: "Berlín, Alemania",
      hourlyRate: 80,
      skills: ["Python", "Django", "SQL"],
    },
    {
      id: 6,
      name: "Ana Gómez",
      title: "Redactora de Contenido",
      rating: 4.6,
      reviews: 65,
      successRate: 92,
      location: "Ciudad de México, México",
      hourlyRate: 45,
      skills: ["Copywriting", "SEO", "Blogs"],
    },
    {
      id: 7,
      name: "Michael Brown",
      title: "Diseñador Gráfico",
      rating: 4.7,
      reviews: 91,
      successRate: 93,
      location: "Toronto, Canadá",
      hourlyRate: 60,
      skills: ["Photoshop", "Illustrator", "Branding"],
    },
    {
      id: 8,
      name: "Sophie Dubois",
      title: "Traductora",
      rating: 4.9,
      reviews: 103,
      successRate: 99,
      location: "París, Francia",
      hourlyRate: 55,
      skills: ["Inglés", "Francés", "Español"],
    },
    {
      id: 9,
      name: "Hiroshi Tanaka",
      title: "Desarrollador de Aplicaciones Móviles",
      rating: 4.8,
      reviews: 88,
      successRate: 96,
      location: "Tokio, Japón",
      hourlyRate: 90,
      skills: ["Swift", "Kotlin", "Flutter"],
    },
  ];

  const categorias = [
    "Desarrollo Web",
    "Diseño",
    "Marketing",
    "Redacción",
    "Traducción",
    "Desarrollo Móvil",
  ];

  const nivelesExperiencia = [
    "Cualquier Experiencia",
    "Principiante",
    "Intermedio",
    "Experto",
  ];

  useEffect(() => {
    let filtered = allFreelancers;

    if (categoryFilter) {
      filtered = filtered.filter(
        (f) =>
          f.skills.some((skill) =>
            skill.toLowerCase().includes(categoryFilter.toLowerCase())
          ) || f.title.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filtrar por precio
    filtered = filtered.filter((f) => f.hourlyRate <= priceRange);

    // Filtrar por experiencia (simulado)
    if (experienceLevel !== "Cualquier Experiencia") {
      // Lógica simplificada para demostración
      if (experienceLevel === "Experto") {
        filtered = filtered.filter((f) => f.rating >= 4.8);
      } else if (experienceLevel === "Intermedio") {
        filtered = filtered.filter((f) => f.rating >= 4.5 && f.rating < 4.8);
      } else if (experienceLevel === "Principiante") {
        filtered = filtered.filter((f) => f.rating < 4.5);
      }
    }

    setTotalPages(Math.ceil(filtered.length / itemsPerPage));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedFreelancers = filtered.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    setFreelancers(selectedFreelancers);
  }, [currentPage, categoryFilter, searchTerm, experienceLevel, priceRange]);

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  const handleFreelancerClick = (freelancerId) => {
    navigate(`/freelancer/${freelancerId}`);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Encontrar Freelancers</h1>
        <p className="text-gray-600 mb-8">
          Navega por nuestra lista seleccionada de los mejores freelancers en
          varias categorías. Utiliza los filtros para encontrar la combinación
          perfecta para tu proyecto.
        </p>

        {/* Buscador - Modificado para no ocupar todo el ancho */}
        <div className="mb-10 max-w-3xl">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
              type="text"
              placeholder="Buscar por habilidades, nombre o título..."
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

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtros - Ahora con posición sticky */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-25">
              <h2 className="text-xl font-bold mb-6">Filtros</h2>

              {/* Filtro por palabra clave */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Palabra clave</h3>
                <input
                  type="text"
                  placeholder="Buscar por palabra clave..."
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Filtro por categoría */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categoría</h3>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Todas las Categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por nivel de experiencia */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Nivel de Experiencia</h3>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={experienceLevel}
                  onChange={(e) => {
                    setExperienceLevel(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {nivelesExperiencia.map((nivel) => (
                    <option key={nivel} value={nivel}>
                      {nivel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por tarifa por hora */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">
                  Tarifa por hora: $10 - ${priceRange}
                </h3>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-800"
                />
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("");
                  setExperienceLevel("Cualquier Experiencia");
                  setPriceRange(150);
                  setCurrentPage(1);
                }}
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>

          {/* Resultados */}
          <div className="w-full md:w-3/4">
            <p className="text-gray-600 mb-4">
              Mostrando {freelancers.length} freelancers
            </p>

            {freelancers.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                <p className="text-gray-500 text-lg">
                  No se encontraron freelancers que coincidan con tus criterios.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("");
                    setExperienceLevel("Cualquier Experiencia");
                    setPriceRange(150);
                    setCurrentPage(1);
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {freelancers.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-start cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleFreelancerClick(freelancer.id)}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={`https://randomuser.me/api/portraits/${
                          freelancer.id % 2 === 0 ? "women" : "men"
                        }/${freelancer.id}.jpg`}
                        alt={freelancer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">
                            {freelancer.name}
                          </h3>
                          <p className="text-gray-600">{freelancer.title}</p>
                        </div>
                        <p className="text-xl font-bold">
                          ${freelancer.hourlyRate}/hr
                        </p>
                      </div>

                      <div className="flex items-center mt-2">
                        <span className="flex items-center text-yellow-500 mr-2">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {freelancer.rating}
                        </span>
                        <span className="text-gray-500 mr-2">
                          • {freelancer.reviews} reseñas
                        </span>
                        <span className="text-gray-500">
                          • {freelancer.successRate}% Éxito en trabajos
                        </span>
                      </div>

                      <div className="flex items-center mt-2 text-gray-500">
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {freelancer.location}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {freelancer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                        {freelancer.skills.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-md">
                            +{freelancer.skills.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Freelancer;
