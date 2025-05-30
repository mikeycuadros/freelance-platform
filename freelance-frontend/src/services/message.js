const BASE_URL = import.meta.env.VITE_API_URL;

const fetchFromApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) throw new Error("Error en la petición");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getAllMessages() {
  return fetchFromApi("/messages");
}

export async function getMessageById(id) {
  return fetchFromApi(`/messages/${id}`);
}

export async function getMessagesByUser(userId) {
  return fetchFromApi(`/message/user/${userId}`);
}

export async function sendMessage(data) {
  // Extraer los IDs del objeto data
  const { chatId, senderId, receiverId, ...messageData } = data;
  
  // Construir la URL con los IDs como parámetros de consulta
  const url = `${BASE_URL}/messages/new?chatId=${chatId}&senderId=${senderId}&receiverId=${receiverId}`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(messageData),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error detallado:", errorData);
    throw new Error(errorData.error || "Error al enviar el mensaje");
  }
  
  return await res.json();
}

export async function deleteMessage(id) {
  const res = await fetch(`${BASE_URL}/messages/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar el mensaje");
  return true;
}
