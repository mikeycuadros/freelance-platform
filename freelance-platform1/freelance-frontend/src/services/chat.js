const BASE_URL = import.meta.env.VITE_API_URL;

export const getUserChats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/chats`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error al obtener los chats", error);
  }
};

// Nueva función para obtener un chat específico por su ID
export const getChatById = async (chatId) => {
  try {
    const response = await fetch(`${BASE_URL}/chats/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error al obtener el chat", error);
  }
};

// Nueva función para verificar si existe un chat entre dos usuarios y crear uno nuevo si es necesario
export const findOrCreateChat = async (userId1, userId2) => {
  try {
    // Primero obtenemos todos los chats del usuario actual
    const chats = await getUserChats();

    // Buscamos si ya existe un chat con el otro usuario
    const existingChat = chats.find(
      (chat) =>
        (chat.user1.id === userId1 && chat.user2.id === userId2) ||
        (chat.user1.id === userId2 && chat.user2.id === userId1)
    );

    // Si existe, devolvemos ese chat
    if (existingChat) {
      return existingChat;
    }

    // Si no existe, creamos uno nuevo
    const response = await fetch(`${BASE_URL}/chats/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      // Modificamos el cuerpo de la petición para incluir los IDs de usuario directamente
      body: JSON.stringify({
        user1_id: userId1,
        user2_id: userId2,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error detallado:", errorData);
      throw new Error(`Error al crear el chat: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error completo:", error);
    throw new Error("Error al buscar o crear el chat", error);
  }
};
