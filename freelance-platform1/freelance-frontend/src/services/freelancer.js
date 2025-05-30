const BASE_URL = import.meta.env.VITE_API_URL;

// Función auxiliar para realizar peticiones con autenticación
const fetchFromApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) throw new Error("Error en la peticion");
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

// Obtener un freelancer por su ID
export const getFreelancerById = async (id) => {
  return fetchFromApi(`/freelancers/${id}`);
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
