// src/services/api.js
import axios from 'axios';

// La URL base de tu API de Flask
const API_URL = 'http://localhost:5000/api';

// Registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    
    if (response.data && response.data.token) {
      // Guardar el token en localStorage para autenticación futura
      localStorage.setItem('userToken', response.data.token);
      return { success: true, data: response.data };
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Error al registrar usuario' 
    };
  }
};

// Verificar frase secreta
export const verifySecretPhrase = async (secretPhrase) => {
  try {
    const response = await axios.post(`${API_URL}/users/verify-phrase`, {
      secretPhrase
    });
    
    if (response.data && response.data.token) {
      // Guardar el token de acceso especial
      localStorage.setItem('accessToken', response.data.token);
      return { success: true, data: response.data };
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Frase secreta incorrecta' 
    };
  }
};