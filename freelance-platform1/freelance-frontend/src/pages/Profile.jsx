import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PersonalInfoTab from "../components/profile/PersonalInfoTab";
import SettingsTab from "../components/profile/SettingsTab";
import FreelancerProfileTab from "../components/profile/FreelancerProfileTab";

const Profile = () => {
  const { user, logout, updateUsername, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isFreelancer, setIsFreelancer] = useState(false);

  // Efecto para cargar los datos del usuario cuando estén disponibles
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        nombre: user.username || user.name || "Usuario",
        correo: user.email || "usuario@example.com",
      });
      
      // Verificar si el usuario es freelancer
      setIsFreelancer(user.roles && user.roles.includes("ROLE_FREELANCER"));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUsername(formData.nombre);
      if (result.user) {
        setMessage({
          text: "Perfil actualizado correctamente",
          type: "success",
        });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        setIsEditing(false);
      } else {
        setMessage({ text: "Error al actualizar el perfil", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error al actualizar el perfil", type: "error" });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: "Las contraseñas no coinciden", type: "error" });
      return;
    }
    try {
      const result = await updatePassword(
        formData.currentPassword,
        formData.newPassword
      );
      if (result.success) {
        setMessage({
          text: "Contraseña actualizada correctamente",
          type: "success",
        });
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      } else {
        setMessage({
          text: "Error al actualizar la contraseña",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "Error al actualizar la contraseña", type: "error" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Mi Perfil</h1>

        {/* Tabs de navegación */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "info"
                ? "border-b-2 border-purple-800 text-purple-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Información Personal
          </button>
          
          {/* Mostrar pestaña de freelancer solo si el usuario tiene ese rol */}
          {isFreelancer && (
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "freelancer"
                  ? "border-b-2 border-purple-800 text-purple-800"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("freelancer")}
            >
              Perfil Freelancer
            </button>
          )}
          
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "settings"
                ? "border-b-2 border-purple-800 text-purple-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Configuración
          </button>
        </div>

        {/* Mensajes de estado */}
        {message.text && (
          <div
            className={`p-3 mb-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Contenido según la pestaña activa */}
        {activeTab === "info" && (
          <PersonalInfoTab 
            user={user}
          />
        )}
        
        {/* Pestaña de perfil freelancer */}
        {activeTab === "freelancer" && isFreelancer && (
          <FreelancerProfileTab user={user} />
        )}

        {activeTab === "settings" && (
          <SettingsTab
            user={user}
            formData={formData}
            handleChange={handleChange}
            handleUpdatePassword={handleUpdatePassword}
            handleLogout={handleLogout}
            setMessage={setMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
