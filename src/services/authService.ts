import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

const API_BASE = "/api/auth";

export const registerUser = async (data: RegisterData) => {
  const res = await axios.post(`${API_BASE}/register`, data, { withCredentials: true });
  return res.data;
}

export const loginUser = async (data: LoginData) => {
  const res = await axios.post(`${API_BASE}/login`, data, { withCredentials: true });
  return res.data;
}

export const logoutUser = async () => {
  const res = await axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
  return res.data;
}

export const verifyUser = async () => {
  const res = await axios.get(`${API_BASE}/verify`, { withCredentials: true });
  return res.data;
}
