import React, { useEffect, useState } from "react";
import { getProfile } from "../api";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setMessage(data.message);
        setToken(data.token);
      } catch (error) {
        setMessage("Fehler: " + error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
      <p><strong>Token:</strong> {token}</p>
    </div>
  );
};

export default Dashboard;
