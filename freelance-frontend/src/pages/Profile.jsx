import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PersonalInfoTab from "../components/profile/PersonalInfoTab";
import SettingsTab from "../components/profile/SettingsTab";
import FreelancerProfileTab from "../components/profile/FreelancerProfileTab";
import Page from "../components/Page";
import { toast } from "sonner";

const Profile = () => {
  const { user, logout, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isFreelancer, setIsFreelancer] = useState(false);

  // Efecto para cargar los datos del usuario cuando estén disponibles
  useEffect(() => {
    if (user) {
      // Verificar si el usuario es freelancer
      setIsFreelancer(user.roles && user.roles.includes("ROLE_FREELANCER"));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (formData.newPassword.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    try {
      const result = await updatePassword(
        formData.currentPassword,
        formData.newPassword
      );
      if (result.success) {
        toast.success("Contraseña actualizada correctamente");
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        toast.error(result.message || "Error al actualizar la contraseña");
      }
    } catch (error) {
      toast.error("Error al actualizar la contraseña");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Page title="Perfil">
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

          {/* Contenido según la pestaña activa */}
          {activeTab === "info" && <PersonalInfoTab user={user} />}

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
            />
          )}
        </div>
      </div>
    </Page>
  );
};

export default Profile;
