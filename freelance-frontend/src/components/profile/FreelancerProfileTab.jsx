import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import {
  getFreelancerById,
  updateFreelancerProfile,
} from "../../services/freelancer";

const FreelancerProfileTab = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [freelancerData, setFreelancerData] = useState({
    title: "",
    description: "",
    hourlyRate: "",
    skills: [],
    experiences: [],
    portfolios: [],
  });
  const [newSkill, setNewSkill] = useState("");
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

  // Función para toggle de colapso por sección y índice
  const toggleCollapse = (section, index) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [index]: !prev[section][index]
      }
    }));
  };

  // Cargar datos del freelancer
  useEffect(() => {
    const fetchFreelancerData = async () => {
      if (!user || !user.id) return;

      setLoading(true);
      try {
        const data = await getFreelancerById(user.id);
        setFreelancerData({
          title: data.title || "",
          description: data.description || "",
          hourlyRate: data.hourlyRate || "",
          skills: data.skills || [],
          experiences: data.experiences || [],
          portfolios: data.portfolios || [],
        });
      } catch (error) {
        console.error("Error al cargar datos del freelancer:", error);
        setMessage({
          text: "No se pudieron cargar tus datos de freelancer",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancerData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFreelancerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setFreelancerData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    setFreelancerData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
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

  const handleAddExperience = () => {
    // Validar que al menos tenga empresa y posición
    if (
      newExperience.company.trim() === "" ||
      newExperience.position.trim() === ""
    ) {
      setMessage({
        text: "La empresa y el puesto son obligatorios",
        type: "error",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    setFreelancerData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));

    // Limpiar el formulario de nueva experiencia
    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleRemoveExperience = (index) => {
    setFreelancerData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
    
    // Limpiar el estado de colapso para este elemento
    setCollapsedSections(prev => {
      const newExperiences = { ...prev.experiences };
      delete newExperiences[index];
      // Reindexar los elementos restantes
      const reindexed = {};
      Object.keys(newExperiences)
        .filter(key => parseInt(key) > index)
        .forEach(key => {
          reindexed[parseInt(key) - 1] = newExperiences[key];
        });
      Object.keys(newExperiences)
        .filter(key => parseInt(key) < index)
        .forEach(key => {
          reindexed[key] = newExperiences[key];
        });
      
      return {
        ...prev,
        experiences: reindexed
      };
    });
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

  const handleAddPortfolio = () => {
    // Validar que al menos tenga título y descripción
    if (
      newPortfolio.title.trim() === "" ||
      newPortfolio.description.trim() === ""
    ) {
      setMessage({
        text: "El título y la descripción son obligatorios",
        type: "error",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }

    setFreelancerData((prev) => ({
      ...prev,
      portfolios: [...prev.portfolios, newPortfolio],
    }));

    // Limpiar el formulario de nuevo portafolio
    setNewPortfolio({
      title: "",
      description: "",
      url: "",
    });
  };

  const handleRemovePortfolio = (index) => {
    setFreelancerData((prev) => ({
      ...prev,
      portfolios: prev.portfolios.filter((_, i) => i !== index),
    }));
    
    // Limpiar el estado de colapso para este elemento
    setCollapsedSections(prev => {
      const newPortfolios = { ...prev.portfolios };
      delete newPortfolios[index];
      // Reindexar los elementos restantes
      const reindexed = {};
      Object.keys(newPortfolios)
        .filter(key => parseInt(key) > index)
        .forEach(key => {
          reindexed[parseInt(key) - 1] = newPortfolios[key];
        });
      Object.keys(newPortfolios)
        .filter(key => parseInt(key) < index)
        .forEach(key => {
          reindexed[key] = newPortfolios[key];
        });
      
      return {
        ...prev,
        portfolios: reindexed
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateFreelancerProfile(user.id, freelancerData);
      setMessage({
        text: "Perfil de freelancer actualizado correctamente",
        type: "success",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error al actualizar perfil de freelancer:", error);
      setMessage({
        text: "Error de conexión al actualizar el perfil",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !freelancerData.title) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Perfil de Freelancer</h2>

      {message.text && (
        <div
          className={`p-3 mb-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

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
          <div className="flex flex-wrap gap-2 mb-2">
            {freelancerData.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Añadir habilidad"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddSkill())
              }
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-purple-800 text-white px-4 py-2 rounded-r hover:bg-purple-900"
            >
              Añadir
            </button>
          </div>
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
                  className="border border-gray-200 rounded-lg p-4"
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
                            onClick={() => toggleCollapse('experiences', index)}
                            className="text-purple-600 hover:text-purple-800 p-1"
                          >
                            <svg 
                              className={`w-5 h-5 transform transition-transform ${
                                collapsedSections.experiences[index] ? 'rotate-180' : ''
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                            value={exp.startDate ? exp.startDate.split("T")[0] : ""}
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
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Formulario para añadir nueva experiencia */}
          <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-4">
            <h4 className="font-medium mb-3">Añadir nueva experiencia</h4>
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
                className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900 text-sm"
              >
                Añadir Experiencia
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
                    className="border border-gray-200 rounded-lg p-4"
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
                              onClick={() => toggleCollapse('portfolios', index)}
                              className="text-purple-600 hover:text-purple-800 p-1"
                            >
                              <svg 
                                className={`w-5 h-5 transform transition-transform ${
                                  collapsedSections.portfolios[index] ? 'rotate-180' : ''
                                }`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          {/* Formulario para añadir nuevo proyecto al portafolio */}
          <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-4">
            <h4 className="font-medium mb-3">Añadir nuevo proyecto</h4>
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
                className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900 text-sm"
              >
                Añadir Proyecto
              </button>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </div>
  );
};

export default FreelancerProfileTab;