import axios from "axios";

// Basis-URL deines Backends
const API_URL = "http://localhost:8081/auth";


export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8081/auth/login", { email, password });

    console.log("Login Response:", response.data); // Debugging

    const token = response.data; // ✅ Direkt speichern
    localStorage.setItem("token", token);

    console.log("Gespeicherter Token:", localStorage.getItem("token")); // Debugging

    return token;
  } catch (error) {
    console.error("Login-Fehler:", error.response ? error.response.data : error);
    throw error.response ? error.response.data : "Fehler beim Login";
  }
};


export const getProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined") {
    console.error(" Kein gültiger Token gefunden!");
    return { error: "Nicht eingeloggt" };
  }

  try {
    const response = await axios.get("http://localhost:8081/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Korrekt senden
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(" Fehler beim Abrufen des Profils:", error.response ? error.response.data : error);
    throw error.response ? error.response.data : "Nicht autorisiert";
  }
};

  
// Registrierung
export const register = async (email, password) => {
  try {
    await axios.post(`${API_URL}/register`, { email, password });
    return "Registrierung erfolgreich!";
  } catch (error) {
    throw error.response ? error.response.data : "Serverfehler";
  }
};

export const getPosts = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:8081/posts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createPost = async (title, text) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://localhost:8081/posts",
    { title, text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deletePost = async (id) => {
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:8081/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const likePost = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `http://localhost:8081/posts/${id}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
