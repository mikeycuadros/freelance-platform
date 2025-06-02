import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/Button";
import { getUserChats } from "../services/chat";
import Spinner from "../components/Spinner";
import Page from "../components/Page";

const Chats = () => {
  const { user, token, isAuthenticated } = useAuth();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      if (!isAuthenticated || !token) {
        setError("Debes iniciar sesión para ver tus mensajes");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getUserChats();
        setChats(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los chats:", err);
        // Mensaje más específico para error de autenticación
        if (err.message && err.message.includes("401")) {
          setError("No autorizado. Por favor, inicia sesión nuevamente.");
        } else {
          setError("Error al cargar los chats: " + err.message);
        }
        setLoading(false);
      }
    };

    fetchChats();
  }, [user, token, isAuthenticated]);

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen px-6 py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mensajes</h1>
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg">
            <p>Debes iniciar sesión para ver tus mensajes</p>
            <Button
              className="mt-4"
              onClick={() => (window.location.href = "/login")}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Page title="Chats">
      <div className="min-h-screen px-6 py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mensajes</h1>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Conversaciones</h2>
            </div>
            <div className="overflow-y-auto max-h-[600px]">
              {chats.length === 0 ? (
                <p className="text-center py-4 text-gray-500">
                  No tienes chats
                </p>
              ) : (
                chats.map((chat) => {
                  // Determinar quién es el otro usuario en el chat
                  const otherUser =
                    user.id === chat.user1.id ? chat.user2 : chat.user1;

                  // Obtener el último mensaje si existe
                  const lastMessage =
                    chat.menssage && chat.menssage.length > 0
                      ? chat.menssage[chat.menssage.length - 1]
                      : null;

                  return (
                    <div
                      key={chat.id}
                      className="p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                      onClick={() =>
                        (window.location.href = `/chat/${chat.id}`)
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                            <span className="font-semibold text-purple-800 text-lg">
                              {otherUser?.username?.charAt(0) || "U"}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {otherUser?.username || "Usuario"}
                            </h3>
                            <p className="text-sm text-gray-500 truncate max-w-[300px]">
                              {lastMessage?.content || "No hay mensajes"}
                            </p>
                          </div>
                        </div>
                        {lastMessage && (
                          <div className="text-right">
                            <span className="text-xs text-gray-400">
                              {new Date(lastMessage.date).toLocaleDateString()}
                            </span>
                            {!lastMessage.read &&
                              lastMessage.sender?.id !== user.id && (
                                <div className="mt-1">
                                  <span className="inline-block w-2 h-2 bg-purple-600 rounded-full"></span>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Chats;
