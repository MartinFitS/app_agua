import axios from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (correo_institucional:string, password:string) => {
  const response = await axios.post('/auth/login', { correo_institucional, password });

  const { token } = response.data;
  if (token) {
    await AsyncStorage.setItem('token', token);
  }

  return response.data;
};

export const logout = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error("Token not found");

  try {
    await axios.post(
      'https://api-tesis-7k22.onrender.com/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
        },
      }
    );
  } catch (err) {
    console.warn("Error al cerrar sesión en backend:", err?.response?.data || err.message);
  }

  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
};
