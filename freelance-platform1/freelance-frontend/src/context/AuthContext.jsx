import { createContext, useState, useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = localStorage.getItem("user");
    return !!user; // Returns true if user exists in localStorage
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      return { message: "Error de conexión", error };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Remove user data from localStorage on logout
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updatePassword = async (oldPassword, newPassword) => {
    try {
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          password: newPassword
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return { success: true, message: "Password updated successfully" };
      }
      return data;
    } catch (error) {
      console.error("Update password error:", error);
      return { message: "Error updating password" };
    }
  };

  const updateUsername = async (newName) => {
    try {
      const response = await fetch(`${API_URL}/users/${user.id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: newName }),
      });

      const data = await response.json();
      if (response.ok) {
        // Update the user in state and localStorage
        const updatedUser = { ...user, name: newName };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { user: updatedUser };
      }
      return data;
    } catch (error) {
      console.error("Update username error:", error);
      return { message: "Error updating username" };
    }
  };

  const register = async (userData) => {
    try {
      // Mapear roles a un formato que el backend pueda entender
      let rolesToSend = [];
      
      if (userData.roles === 'freelancer') {
        rolesToSend.push('ROLE_FREELANCER');
      } else if (userData.roles === 'client') {
        rolesToSend.push('ROLE_CLIENT');
      }
      
      // Crear objeto con datos modificados
      const dataToSend = {
        ...userData,
        roles: rolesToSend // Enviar el array de roles en el formato correcto
      };
      
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Si el registro es exitoso, también iniciamos sesión automáticamente
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        // Guardamos los datos del usuario en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message || "Error en el registro" };
    } catch (error) {
      console.error("Error de registro:", error);
      return { success: false, message: "Error de conexión" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
        updateUsername,
        updatePassword,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
