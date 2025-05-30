import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getChatById } from "../services/chat";
import { sendMessage } from "../services/message";
import { Button } from "../components/Button";

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
        chatId: id,          // Enviar IDs en lugar de IRIs
        senderId: user.id,    // Enviar IDs en lugar de IRIs
        receiverId: otherUser.id  // Enviar IDs en lugar de IRIs
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
    return <div className="text-center py-10">Cargando conversación...</div>;
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
            <Button
              className="mt-4"
              onClick={() => navigate("/chats")}
            >
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
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Conversación con {otherUser?.username || "Usuario"}</h1>
          <Button onClick={() => navigate("/chats")} variant="outline">
            Volver a Mensajes
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Mensajes</h2>
          </div>

          <div className="overflow-y-auto max-h-[500px] p-4">
            {chat?.menssage?.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No hay mensajes en esta conversación</p>
            ) : (
              <div className="space-y-4">
                {chat?.menssage?.map((message) => {
                  const isCurrentUser = message.sender?.id === user.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${isCurrentUser ? "bg-blue-100" : "bg-gray-100"}`}
                      >
                        <p>{message.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 p-2 border rounded-md"
              />
              <Button type="submit">Enviar</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;