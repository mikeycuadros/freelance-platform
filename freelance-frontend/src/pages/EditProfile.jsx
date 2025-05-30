import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Estado para el formulario
  const [formData, setFormData] = useState({
    // Datos básicos (para todos los usuarios)
    nombre: "",
    email: "",
    ubicacion: "",
    telefono: "",
    sitioWeb: "",
    
    // Tipo de cuenta
    tipo: "cliente", // Por defecto cliente
    
    // Datos específicos para freelancers
    titulo: "",
    descripcion: "",
    tarifaHora: "",
    habilidades: [],
    
    // Arrays para información detallada de freelancers
    experiencia: [],
    educacion: [],
    portfolio: []
  });

  // Estado para controlar nuevos elementos en arrays
  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState({
    empresa: "",
    posicion: "",
    periodo: "",
    descripcion: ""
  });
  const [newEducation, setNewEducation] = useState({
    institucion: "",
    titulo: "",
    año: ""
  });
  const [newPortfolio, setNewPortfolio] = useState({
    titulo: "",
    descripcion: "",
    enlace: ""
  });

  // Cargar datos del usuario actual
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Aquí harías la llamada a tu API para obtener los datos del usuario
        // const response = await fetch('/api/user/profile');
        // const userData = await response.json();
        
        // Por ahora, usamos datos de ejemplo
        const mockUserData = {
          nombre: "Alex Johnson",
          email: "alex@ejemplo.com",
          ubicacion: "Madrid, España",
          telefono: "123-456-789",
          sitioWeb: "alexjohnson.com",
          tipo: "cliente"
        };
        
        setFormData(prevData => ({
          ...prevData,
          ...mockUserData
        }));
        
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        setMessage({
          type: "error",
          text: "No se pudieron cargar tus datos. Por favor, intenta de nuevo."
        });
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Manejar cambio de tipo de cuenta
  const handleAccountTypeChange = (e) => {
    const newType = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      tipo: newType
    }));
  };

  // Manejar adición de habilidades
  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setFormData(prevData => ({
        ...prevData,
        habilidades: [...prevData.habilidades, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  // Eliminar habilidad
  const handleRemoveSkill = (index) => {
    setFormData(prevData => ({
      ...prevData,
      habilidades: prevData.habilidades.filter((_, i) => i !== index)
    }));
  };

  // Manejar adición de experiencia
  const handleAddExperience = () => {
    if (newExperience.empresa && newExperience.posicion) {
      setFormData(prevData => ({
        ...prevData,
        experiencia: [...prevData.experiencia, { ...newExperience }]
      }));
      setNewExperience({
        empresa: "",
        posicion: "",
        periodo: "",
        descripcion: ""
      });
    }
  };

  // Manejar cambios en nueva experiencia
  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Eliminar experiencia
  const handleRemoveExperience = (index) => {
    setFormData(prevData => ({
      ...prevData,
      experiencia: prevData.experiencia.filter((_, i) => i !== index)
    }));
  };

  // Manejar adición de educación
  const handleAddEducation = () => {
    if (newEducation.institucion && newEducation.titulo) {
      setFormData(prevData => ({
        ...prevData,
        educacion: [...prevData.educacion, { ...newEducation }]
      }));
      setNewEducation({
        institucion: "",
        titulo: "",
        año: ""
      });
    }
  };

  // Manejar cambios en nueva educación
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Eliminar educación
  const handleRemoveEducation = (index) => {
    setFormData(prevData => ({
      ...prevData,
      educacion: prevData.educacion.filter((_, i) => i !== index)
    }));
  };

  // Manejar adición de proyecto al portfolio
  const handleAddPortfolio = () => {
    if (newPortfolio.titulo && newPortfolio.descripcion) {
      setFormData(prevData => ({
        ...prevData,
        portfolio: [...prevData.portfolio, { ...newPortfolio }]
      }));
      setNewPortfolio({
        titulo: "",
        descripcion: "",
        enlace: ""
      });
    }
  };

  // Manejar cambios en nuevo proyecto de portfolio
  const handlePortfolioChange = (e) => {
    const { name, value } = e.target;
    setNewPortfolio(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Eliminar proyecto del portfolio
  const handleRemovePortfolio = (index) => {
    setFormData(prevData => ({
      ...prevData,
      portfolio: prevData.portfolio.filter((_, i) => i !== index)
    }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Aquí harías la llamada a tu API para actualizar el perfil
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) throw new Error('Error al actualizar perfil');
      
      // Simulamos una respuesta exitosa
      console.log("Datos enviados:", formData);
      
      setMessage({
        type: "success",
        text: "¡Perfil actualizado con éxito!"
      });
      
      // Redirigir después de un tiempo
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
      
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      setMessage({
        type: "error",
        text: "No se pudo actualizar tu perfil. Por favor, intenta de nuevo."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Editar Perfil</h1>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Información Básica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Ubicación</label>
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Sitio Web</label>
                <input
                  type="text"
                  name="sitioWeb"
                  value={formData.sitioWeb}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Tipo de Cuenta</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleAccountTypeChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                >
                  <option value="cliente">Cliente</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Sección condicional para freelancers */}
          {formData.tipo === "freelancer" && (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Perfil Profesional</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Título Profesional</label>
                    <input
                      type="text"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                      placeholder="Ej: Desarrollador Full Stack"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Descripción Profesional</label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                      rows="4"
                      placeholder="Describe tu experiencia, especialidades y lo que te hace único..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Tarifa por Hora ($)</label>
                    <input
                      type="number"
                      name="tarifaHora"
                      value={formData.tarifaHora}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                      min="1"
                      placeholder="Ej: 25"
                    />
                  </div>
                </div>
                
                {/* Habilidades */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Habilidades</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                      placeholder="Añadir habilidad (Ej: React, Diseño UX, Marketing)"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900"
                    >
                      Añadir
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.habilidades.map((skill, index) => (
                      <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="ml-2 text-purple-800 hover:text-purple-900"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Experiencia Laboral */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Experiencia Laboral</h2>
                
                <div className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Empresa</label>
                      <input
                        type="text"
                        name="empresa"
                        value={newExperience.empresa}
                        onChange={handleExperienceChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Posición</label>
                      <input
                        type="text"
                        name="posicion"
                        value={newExperience.posicion}
                        onChange={handleExperienceChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Periodo</label>
                      <input
                        type="text"
                        name="periodo"
                        value={newExperience.periodo}
                        onChange={handleExperienceChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                        placeholder="Ej: 2020 - Presente"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Descripción</label>
                      <textarea
                        name="descripcion"
                        value={newExperience.descripcion}
                        onChange={handleExperienceChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                        rows="3"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="w-full py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900"
                  >
                    Añadir Experiencia
                  </button>
                </div>
                
                {/* Lista de experiencias */}
                {formData.experiencia.length > 0 && (
                  <div className="space-y-4">
                    {formData.experiencia.map((exp, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{exp.posicion}</h3>
                            <p className="text-gray-600">{exp.empresa}</p>
                            <p className="text-sm text-gray-500">{exp.periodo}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveExperience(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Eliminar
                          </button>
                        </div>
                        <p className="mt-2 text-gray-700">{exp.descripcion}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Educación */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Educación</h2>
                
                <div className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Institución</label>
                      <input
                        type="text"
                        name="institucion"
                        value={newEducation.institucion}
                        onChange={handleEducationChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Título</label>
                      <input
                        type="text"
                        name="titulo"
                        value={newEducation.titulo}
                        onChange={handleEducationChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Año</label>
                      <input
                        type="text"
                        name="año"
                        value={newEducation.año}
                        onChange={handleEducationChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                        placeholder="Ej: 2016-2020"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="w-full py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900"
                  >
                    Añadir Educación
                  </button>
                </div>
                
                {/* Lista de educación */}
                {formData.educacion.length > 0 && (
                  <div className="space-y-4">
                    {formData.educacion.map((edu, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{edu.institucion}</h3>
                            <p className="text-gray-600">{edu.titulo}</p>
                            <p className="text-sm text-gray-500">{edu.año}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveEducation(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Portfolio */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Portfolio</h2>
                
                <div className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Título del Proyecto</label>
                      <input
                        type="text"
                        name="titulo"
                        value={newPortfolio.titulo}
                        onChange={handlePortfolioChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Enlace</label>
                      <input
                        type="text"
                        name="enlace"
                        value={newPortfolio.enlace}
                        onChange={handlePortfolioChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                        placeholder="https://..."
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Descripción</label>
                      <textarea
                        name="descripcion"
                        value={newPortfolio.descripcion}
                        onChange={handlePortfolioChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                        rows="3"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAddPortfolio}
                    className="w-full py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900"
                  >
                    Añadir Proyecto
                  </button>
                </div>
                
                {/* Lista de proyectos */}
                {formData.portfolio.length > 0 && (
                  <div className="space-y-4">
                    {formData.portfolio.map((project, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{project.titulo}</h3>
                            {project.enlace && (
                              <a 
                                href={project.enlace}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-800 hover:underline"
                              >
                                Ver proyecto
                              </a>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemovePortfolio(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Eliminar
                          </button>
                        </div>
                        <p className="mt-2 text-gray-700">{project.descripcion}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;