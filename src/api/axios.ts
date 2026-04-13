import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:4000', // Ton port json-server
  headers: { 'Content-Type': 'application/json' }, 
  timeout: 5000,
});

// Fonction pour mettre à jour le token
  export function setAuthToken(token: string | null) { if (token) { api.defaults.headers.common['Authorization'] = `Bearer ${token}`; } 
 else
   { 
 delete api.defaults.headers.common['Authorization'];
 }
 }

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    // On simule la récupération du token (qui sera normalement géré par Redux plus tard)
    const token = sessionStorage.getItem('token'); 
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;