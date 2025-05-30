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

// Funciones para categorías
export async function getAllCategories() {
  return fetchFromApi("/categories");
}

export async function getCategoryById(id) {
  return fetchFromApi(`/categories/${id}`);
}

export async function createCategory(data) {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear la categoría");
  return await res.json();
}

export async function updateCategory(id, data) {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar la categoría");
  return await res.json();
}

export async function deleteCategory(id) {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar la categoría");
  return true;
}
