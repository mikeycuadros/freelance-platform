const BASE_URL = import.meta.env.VITE_API_URL;

// Función auxiliar para realizar peticiones con autenticación
const fetchFromApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      // Si es un 404, lanzamos un error específico
      if (response.status === 404) {
        throw new Error("404");
      }
      throw new Error("Error en la peticion");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener todos los freelancers
export const getAllFreelancers = async () => {
  return fetchFromApi("/freelancers");
};

// Obtener un freelancer por su ID o el del usuario autenticado
export const getFreelancerById = async (id) => {
  const endpoint = id ? `/freelancers/${id}` : "/user/freelancer";
  return fetchFromApi(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// Actualizar el perfil de un freelancer
export const updateFreelancerProfile = async (id, freelancerData) => {
  return fetchFromApi(`/freelancers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(freelancerData),
  });
};
