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
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center">
                <span className="text-3xl font-semibold text-purple-800">
                  {user?.username?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.username}
                </h1>
                <p className="text-gray-500">{user?.email}</p>
                {isFreelancer && (
                  <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Freelancer
                  </span>
                )}
              </div>
            </div>

            {/* Tabs de navegación */}
            <div className="flex space-x-1 border-b mb-6 overflow-x-auto">
              <button
                className={`flex-shrink-0 px-4 py-2 font-medium rounded-t-lg transition-colors duration-200 ${
                  activeTab === "info"
                    ? "bg-purple-50 border-b-2 border-purple-800 text-purple-800"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("info")}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Información Personal</span>
                </div>
              </button>

              {isFreelancer && (
                <button
                  className={`flex-shrink-0 px-4 py-2 font-medium rounded-t-lg transition-colors duration-200 ${
                    activeTab === "freelancer"
                      ? "bg-purple-50 border-b-2 border-purple-800 text-purple-800"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("freelancer")}
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Perfil Freelancer</span>
                  </div>
                </button>
              )}

              <button
                className={`flex-shrink-0 px-4 py-2 font-medium rounded-t-lg transition-colors duration-200 ${
                  activeTab === "settings"
                    ? "bg-purple-50 border-b-2 border-purple-800 text-purple-800"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Configuración</span>
                </div>
              </button>
            </div>

            {/* Contenido según la pestaña activa */}
            <div className="bg-white rounded-lg">
              {activeTab === "info" && <PersonalInfoTab user={user} />}
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
        </div>
      </div>
    </Page>
  );
};

export default Profile;
