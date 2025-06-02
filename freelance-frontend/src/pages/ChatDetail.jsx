import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getChatById } from "../services/chat";
import { sendMessage } from "../services/message";
import { Button } from "../components/Button";
import Spinner from "../components/Spinner";
import Page from "../components/Page";

const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchChat = async () => {
      if (!isAuthenticated) {
        setError("Debes iniciar sesión para ver este chat");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getChatById(id);
        setChat(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar el chat:", err);
        setError("Error al cargar el chat: " + err.message);
        setLoading(false);
      }
    };

    fetchChat();
  }, [id, isAuthenticated]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Crear un objeto con solo el contenido y la fecha
      const messageData = {
        content: newMessage,
        date: new Date().toISOString(),
        chatId: id, // Enviar IDs en lugar de IRIs
        senderId: user.id, // Enviar IDs en lugar de IRIs
        receiverId: otherUser.id, // Enviar IDs en lugar de IRIs
      };

      await sendMessage(messageData);
      // Recargar el chat para mostrar el nuevo mensaje
      const updatedChat = await getChatById(id);
      setChat(updatedChat);
      setNewMessage("");
    } catch (err) {
      console.error("Error al enviar el mensaje:", err);
      setError("Error al enviar el mensaje: " + err.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen px-6 py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Conversación</h1>
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg">
            <p>Debes iniciar sesión para ver esta conversación</p>
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

  if (error) {
    return (
      <div className="min-h-screen px-6 py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Conversación</h1>
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            <p>{error}</p>
            <Button className="mt-4" onClick={() => navigate("/chats")}>
              Volver a Mensajes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Determinar quién es el otro usuario en el chat
  const otherUser = user.id === chat?.user1?.id ? chat?.user2 : chat?.user1;

  return (
    <Page title={otherUser?.username}>
      <div className="min-h-screen px-6 py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">
              Conversación con {otherUser?.username || "Usuario"}
            </h1>
            <Button onClick={() => navigate("/chats")} variant="outline">
              Volver a Mensajes
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b bg-purple-50">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-purple-800 text-lg">
                    {otherUser?.username?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {otherUser?.username || "Usuario"}
                  </h2>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[500px] p-4 bg-gray-50">
              {chat?.menssage?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
                  <svg
                    className="w-16 h-16 mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p>No hay mensajes en esta conversación</p>
                  <p className="text-sm mt-2">
                    ¡Envía un mensaje para comenzar!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {chat?.menssage?.map((message, index) => {
                    const isCurrentUser = message.sender?.id === user.id;
                    const messageDate = new Date(message.date);

                    // Obtener la fecha del mensaje anterior para comparar
                    const prevMessage =
                      index > 0 ? chat.menssage[index - 1] : null;
                    const prevMessageDate = prevMessage
                      ? new Date(prevMessage.date)
                      : null;

                    // Mostrar la fecha solo si es el primer mensaje o si es un día diferente
                    const showDate =
                      !prevMessageDate ||
                      messageDate.toDateString() !==
                        prevMessageDate.toDateString();

                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {messageDate.toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                        <div
                          className={`flex ${
                            isCurrentUser ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isCurrentUser
                                ? "bg-purple-600 text-white"
                                : "bg-white shadow-sm"
                            }`}
                          >
                            <p>{message.content}</p>
                            <span className="text-xs mt-1 block opacity-70">
                              {messageDate.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-white">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button
                  type="submit"
                  className="px-6"
                  disabled={!newMessage.trim()}
                >
                  Enviar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ChatDetail;
