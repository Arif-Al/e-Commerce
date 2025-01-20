import axios from "axios";


const axiosClient = axios.create({
  baseURL: "https://fakestoreapi.com/",
})

// There are two parts of axios 
// 1. Request

axiosClient.interceptors.request.use((config) => {
  
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}` 
  }
  return config;
},
(error) => {
  return Promise.reject(error)
}

)

// 2. Response

axiosClient.interceptors.response.use((response) => {
  return response
},
(error) => {
  if (error.response.status === 520) {
    window.location.href = '/sign-in'
  }
}
);

export default axiosClient
