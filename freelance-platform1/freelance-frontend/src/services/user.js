const BASE_URL = import.meta.env.VITE_API_URL;

const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error("Error en la peticion");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getAllFreelancers() {
  return fetchFromApi("/users");
}

export const getFreelancerById = async (id) => {
  return fetchFromApi(`/users/${id}`);
};

export const getFreelancersWithRole = async () => {
  const users = await fetchFromApi("/users");
  return users.filter(
    (user) => user.roles && user.roles.includes("ROLE_FREELANCER")
  );
};
