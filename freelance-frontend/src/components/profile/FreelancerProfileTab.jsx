import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import { toast } from "sonner";
import {
  getFreelancerById,
  updateFreelancerProfile,
} from "../../services/freelancer";
import Spinner from "../Spinner";
import { getAllCategories } from "../../services/category";

const FreelancerProfileTab = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [loadingExperience, setLoadingExperience] = useState(null); // Para controlar el loading de cada experiencia
  const [loadingPortfolio, setLoadingPortfolio] = useState(null); // Para controlar el loading de cada proyecto
  const [freelancerData, setFreelancerData] = useState({
    title: "",
    description: "",
    hourlyRate: "",
    skills: [],
    experiences: [],
    portfolios: [],
  });
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    description: "",
    url: "",
  });

  // Estados para controlar el colapso de secciones
  const [collapsedSections, setCollapsedSections] = useState({
    experiences: {},
    portfolios: {},
  });

  const [categoriesWithSkills, setCategoriesWithSkills] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Función para toggle de colapso por sección y índice
  const toggleCollapse = (section, index) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [index]: !prev[section][index],
      },
    }));
  };

  // Cargar datos del freelancer
  useEffect(() => {
    const fetchFreelancerData = async () => {
      if (!user || !user.id) {
        setLoading(false); // Asegurarse de que loading se desactive si no hay usuario
        return;
      }

      setLoading(true);
      try {
        const data = await getFreelancerById(); // Obtener el freelancer del usuario autenticado
        setFreelancerData({
          title: data.title ?? "",
          description: data.description ?? "",
          hourlyRate:
            data.hourlyRate !== undefined && data.hourlyRate !== null
              ? data.hourlyRate
              : "",
          skills: data.skills || [],
          experiences: data.experiences || [],
          portfolios: data.portfolios || [],
        });
      } catch (error) {
        // Si el error es 404, es normal para un usuario nuevo
        if (error.message === "404") {
          // Inicializar con datos vacíos
          setFreelancerData({
            title: "",
            description: "",
            hourlyRate: "",
            skills: [],
            experiences: [],
            portfolios: [],
          });
        } else {
          console.error("Error al cargar datos del freelancer:", error);
          // Mostrar un mensaje de error más específico si no es un 404
          if (error.message.includes("401")) {
            toast.error("No autorizado. Por favor, inicia sesión de nuevo.");
          } else {
            toast.error("Error al cargar tus datos de freelancer.");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancerData();
  }, [user]); // Dependencia en 'user' para re-ejecutar si el usuario cambia

  // Obtener todas las skills únicas de las categorías
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const categories = await getAllCategories();
        setCategoriesWithSkills(categories);
      } catch (error) {
        console.error("Error al cargar las skills de las categorías", error);
      }
    };
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFreelancerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleSkill = (skill) => {
    setFreelancerData((prev) => {
      if (prev.skills.includes(skill)) {
        return {
          ...prev,
          skills: prev.skills.filter((s) => s !== skill),
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, skill],
        };
      }
    });
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    setFreelancerData((prev) => {
      const updatedExperiences = [...prev.experiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [name]: value,
      };
      return {
        ...prev,
        experiences: updatedExperiences,
      };
    });
  };

  const handleNewExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddExperience = async () => {
    if (
      newExperience.company.trim() === "" ||
      newExperience.position.trim() === ""
    ) {
      toast.error("La empresa y el puesto son obligatorios");
      return;
    }

    setLoadingExperience("new");
    try {
      const updatedData = {
        ...freelancerData,
        experiences: [...freelancerData.experiences, newExperience],
      };

      await updateFreelancerProfile(user.id, updatedData);
      setFreelancerData(updatedData);
      toast.success("Experiencia añadida correctamente");

      // Limpiar el formulario de nueva experiencia
      setNewExperience({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } catch (error) {
      console.error("Error al añadir experiencia:", error);
      toast.error("Error al añadir la experiencia");
    } finally {
      setLoadingExperience(null);
    }
  };

  const handleUpdateExperience = async (index) => {
    setLoadingExperience(index);
    try {
      const updatedData = {
        ...freelancerData,
        experiences: [...freelancerData.experiences],
      };

      await updateFreelancerProfile(user.id, updatedData);
      toast.success("Experiencia actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar experiencia:", error);
      toast.error("Error al actualizar la experiencia");
    } finally {
      setLoadingExperience(null);
    }
  };

  const handleRemoveExperience = async (index) => {
    setLoadingExperience(index);
    try {
      const updatedData = {
        ...freelancerData,
        experiences: freelancerData.experiences.filter((_, i) => i !== index),
      };

      await updateFreelancerProfile(user.id, updatedData);
      setFreelancerData(updatedData);
      toast.success("Experiencia eliminada correctamente");

      // Limpiar el estado de colapso para este elemento
      setCollapsedSections((prev) => {
        const newExperiences = { ...prev.experiences };
        delete newExperiences[index];
        // Reindexar los elementos restantes
        const reindexed = {};
        Object.keys(newExperiences)
          .filter((key) => parseInt(key) > index)
          .forEach((key) => {
            reindexed[parseInt(key) - 1] = newExperiences[key];
          });
        Object.keys(newExperiences)
          .filter((key) => parseInt(key) < index)
          .forEach((key) => {
            reindexed[key] = newExperiences[key];
          });

        return {
          ...prev,
          experiences: reindexed,
        };
      });
    } catch (error) {
      console.error("Error al eliminar experiencia:", error);
      toast.error("Error al eliminar la experiencia");
    } finally {
      setLoadingExperience(null);
    }
  };

  // Nuevas funciones para gestionar el portafolio
  const handlePortfolioChange = (e, index) => {
    const { name, value } = e.target;
    setFreelancerData((prev) => {
      const updatedPortfolios = [...prev.portfolios];
      updatedPortfolios[index] = {
        ...updatedPortfolios[index],
        [name]: value,
      };
      return {
        ...prev,
        portfolios: updatedPortfolios,
      };
    });
  };

  const handleNewPortfolioChange = (e) => {
    const { name, value } = e.target;
    setNewPortfolio((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPortfolio = async () => {
    if (
      newPortfolio.title.trim() === "" ||
      newPortfolio.description.trim() === ""
    ) {
      toast.error("El título y la descripción son obligatorios");
      return;
    }

    setLoadingPortfolio("new");
    try {
      const updatedData = {
        ...freelancerData,
        portfolios: [...freelancerData.portfolios, newPortfolio],
      };

      await updateFreelancerProfile(user.id, updatedData);
      setFreelancerData(updatedData);
      toast.success("Proyecto añadido correctamente");

      // Limpiar el formulario de nuevo proyecto
      setNewPortfolio({
        title: "",
        description: "",
        url: "",
      });
    } catch (error) {
      console.error("Error al añadir proyecto:", error);
      toast.error("Error al añadir el proyecto");
    } finally {
      setLoadingPortfolio(null);
    }
  };

  const handleUpdatePortfolio = async (index) => {
    setLoadingPortfolio(index);
    try {
      const updatedData = {
        ...freelancerData,
        portfolios: [...freelancerData.portfolios],
      };

      await updateFreelancerProfile(user.id, updatedData);
      toast.success("Proyecto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
      toast.error("Error al actualizar el proyecto");
    } finally {
      setLoadingPortfolio(null);
    }
  };

  const handleRemovePortfolio = async (index) => {
    setLoadingPortfolio(index);
    try {
      const updatedData = {
        ...freelancerData,
        portfolios: freelancerData.portfolios.filter((_, i) => i !== index),
      };

      await updateFreelancerProfile(user.id, updatedData);
      setFreelancerData(updatedData);
      toast.success("Proyecto eliminado correctamente");

      // Limpiar el estado de colapso para este elemento
      setCollapsedSections((prev) => {
        const newPortfolios = { ...prev.portfolios };
        delete newPortfolios[index];
        // Reindexar los elementos restantes
        const reindexed = {};
        Object.keys(newPortfolios)
          .filter((key) => parseInt(key) > index)
          .forEach((key) => {
            reindexed[parseInt(key) - 1] = newPortfolios[key];
          });
        Object.keys(newPortfolios)
          .filter((key) => parseInt(key) < index)
          .forEach((key) => {
            reindexed[key] = newPortfolios[key];
          });

        return {
          ...prev,
          portfolios: reindexed,
        };
      });
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      toast.error("Error al eliminar el proyecto");
    } finally {
      setLoadingPortfolio(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Solo enviamos los campos básicos
      const basicData = {
        title: freelancerData.title,
        description: freelancerData.description,
        hourlyRate: freelancerData.hourlyRate,
        skills: freelancerData.skills,
      };

      await updateFreelancerProfile(user.id, basicData);
      toast.success("Perfil de freelancer actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil de freelancer:", error);
      toast.error("Error de conexión al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !freelancerData.title) {
    return <Spinner />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Perfil de Freelancer</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Título profesional</label>
          <input
            type="text"
            name="title"
            value={freelancerData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ej: Desarrollador Web Full Stack"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descripción</label>
          <textarea
            name="description"
            value={freelancerData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Describe tu experiencia y servicios..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Tarifa por hora (€)
          </label>
          <input
            type="number"
            name="hourlyRate"
            value={freelancerData.hourlyRate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ej: 25"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Habilidades</label>
          {/* Mostrar habilidades seleccionadas */}
          <div className="mb-4">
            <div className="font-semibold text-gray-700 mb-1">
              Seleccionadas:
            </div>
            {freelancerData.skills.length === 0 ? (
              <div className="text-gray-400 text-sm mb-2">
                No has seleccionado habilidades aún.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 mb-2">
                {freelancerData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-purple-800 text-white px-3 py-1 rounded-full flex items-center text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className="ml-2 text-white hover:text-red-200 focus:outline-none"
                      title="Quitar habilidad"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Select para elegir categoría */}
          <div className="mb-4">
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecciona una categoría</option>
              {categoriesWithSkills.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {selectedCategoryId && (
            <div className="mb-2">
              <div className="font-semibold text-purple-800 mb-2">
                {
                  categoriesWithSkills.find(
                    (cat) => cat.id === parseInt(selectedCategoryId)
                  )?.name
                }
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {(
                  categoriesWithSkills.find(
                    (cat) => cat.id === parseInt(selectedCategoryId)
                  )?.skills || []
                ).map((skill) => {
                  const selected = freelancerData.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className={`px-3 py-1 rounded-full border transition-colors duration-150 text-sm focus:outline-none
                        ${
                          selected
                            ? "bg-purple-800 text-white border-purple-800 shadow"
                            : "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200"
                        }
                      `}
                    >
                      {skill}
                      {selected && <span className="ml-1">✔️</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>

        {/* Sección de Experiencias */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Experiencia Laboral</h3>

          {/* Lista de experiencias existentes */}
          {freelancerData.experiences.length > 0 && (
            <div className="mb-4 space-y-4">
              {freelancerData.experiences.map((exp, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{exp.position}</h4>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(exp.startDate).toLocaleDateString()} -
                            {exp.endDate
                              ? new Date(exp.endDate).toLocaleDateString()
                              : "Actual"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleCollapse("experiences", index)}
                            className="text-purple-600 hover:text-purple-800 p-1"
                          >
                            <svg
                              className={`w-5 h-5 transform transition-transform ${
                                collapsedSections.experiences[index]
                                  ? "rotate-180"
                                  : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveExperience(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!collapsedSections.experiences[index] && (
                    <>
                      <p className="text-gray-700 mb-3">{exp.description}</p>

                      {/* Campos para editar la experiencia */}
                      <div className="pt-3 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Empresa
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(e, index)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Puesto
                          </label>
                          <input
                            type="text"
                            name="position"
                            value={exp.position}
                            onChange={(e) => handleExperienceChange(e, index)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Fecha inicio
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            value={
                              exp.startDate ? exp.startDate.split("T")[0] : ""
                            }
                            onChange={(e) => handleExperienceChange(e, index)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Fecha fin
                          </label>
                          <input
                            type="date"
                            name="endDate"
                            value={exp.endDate ? exp.endDate.split("T")[0] : ""}
                            onChange={(e) => handleExperienceChange(e, index)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm text-gray-600 mb-1">
                            Descripción
                          </label>
                          <textarea
                            name="description"
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(e, index)}
                            rows="2"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          ></textarea>
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleUpdateExperience(index)}
                            disabled={loadingExperience === index}
                            className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900 text-sm disabled:opacity-50"
                          >
                            {loadingExperience === index
                              ? "Guardando..."
                              : "Guardar cambios"}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Formulario para añadir nueva experiencia */}
          <div className="border-2 border-purple-200 rounded-lg p-4 mb-4 bg-purple-50 hover:bg-purple-100 transition-colors duration-200">
            <h4 className="font-medium mb-3 text-purple-800">
              Añadir nueva experiencia
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Empresa *
                </label>
                <input
                  type="text"
                  name="company"
                  value={newExperience.company}
                  onChange={handleNewExperienceChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Puesto *
                </label>
                <input
                  type="text"
                  name="position"
                  value={newExperience.position}
                  onChange={handleNewExperienceChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Tu cargo o puesto"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Fecha inicio
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={newExperience.startDate}
                  onChange={handleNewExperienceChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Fecha fin
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={newExperience.endDate}
                  onChange={handleNewExperienceChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={newExperience.description}
                  onChange={handleNewExperienceChange}
                  rows="2"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Describe tus responsabilidades y logros"
                ></textarea>
              </div>
            </div>
            <div className="mt-3 text-right">
              <button
                type="button"
                onClick={handleAddExperience}
                disabled={loadingExperience === "new"}
                className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900 text-sm disabled:opacity-50"
              >
                {loadingExperience === "new"
                  ? "Añadiendo..."
                  : "Añadir Experiencia"}
              </button>
            </div>
          </div>
        </div>

        {/* Nueva sección de Portafolio */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Portafolio</h3>

          {/* Lista de proyectos de portafolio existentes */}
          {freelancerData.portfolios &&
            freelancerData.portfolios.length > 0 && (
              <div className="mb-4 space-y-4">
                {freelancerData.portfolios.map((portfolio, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{portfolio.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {portfolio.description}
                            </p>
                            {portfolio.url && (
                              <a
                                href={portfolio.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-800 hover:underline text-sm"
                              >
                                {portfolio.url}
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                toggleCollapse("portfolios", index)
                              }
                              className="text-purple-600 hover:text-purple-800 p-1"
                            >
                              <svg
                                className={`w-5 h-5 transform transition-transform ${
                                  collapsedSections.portfolios[index]
                                    ? "rotate-180"
                                    : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemovePortfolio(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Campos para editar el proyecto (colapsables) */}
                    {!collapsedSections.portfolios[index] && (
                      <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Título
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={portfolio.title}
                            onChange={(e) => handlePortfolioChange(e, index)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Descripción
                          </label>
                          <textarea
                            name="description"
                            value={portfolio.description}
                            onChange={(e) => handlePortfolioChange(e, index)}
                            rows="2"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          ></textarea>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            URL del proyecto
                          </label>
                          <input
                            type="url"
                            name="url"
                            value={portfolio.url}
                            onChange={(e) => handlePortfolioChange(e, index)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                            placeholder="https://ejemplo.com/proyecto"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleUpdatePortfolio(index)}
                            disabled={loadingPortfolio === index}
                            className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900 text-sm disabled:opacity-50"
                          >
                            {loadingPortfolio === index
                              ? "Guardando..."
                              : "Guardar cambios"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          {/* Formulario para añadir nuevo proyecto al portafolio */}
          <div className="border-2 border-purple-200 rounded-lg p-4 mb-4 bg-purple-50 hover:bg-purple-100 transition-colors duration-200">
            <h4 className="font-medium mb-3 text-purple-800">
              Añadir nuevo proyecto
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newPortfolio.title}
                  onChange={handleNewPortfolioChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Nombre del proyecto"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  value={newPortfolio.description}
                  onChange={handleNewPortfolioChange}
                  rows="2"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Describe brevemente el proyecto"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  URL del proyecto
                </label>
                <input
                  type="url"
                  name="url"
                  value={newPortfolio.url}
                  onChange={handleNewPortfolioChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="https://ejemplo.com/proyecto"
                />
              </div>
            </div>
            <div className="mt-3 text-right">
              <button
                type="button"
                onClick={handleAddPortfolio}
                disabled={loadingPortfolio === "new"}
                className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900 text-sm disabled:opacity-50"
              >
                {loadingPortfolio === "new"
                  ? "Añadiendo..."
                  : "Añadir Proyecto"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FreelancerProfileTab;
