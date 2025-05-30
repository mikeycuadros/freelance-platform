const BASE_URL = import.meta.env.VITE_API_URL;

// Función para añadir una nueva reseña
export const addReview = async (reviewData) => {
  try {    
    const response = await fetch(`${BASE_URL}/reviews/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error completo:", error);
    throw new Error("Error al crear la reseña", error);
  }
};