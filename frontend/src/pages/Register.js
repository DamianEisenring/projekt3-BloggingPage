import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import "./register.css"; // Spezifisches CSS für Register

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(email, password);
      setMessage(response);
    } catch (err) {
      setMessage(err);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrieren</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrieren</button>
      </form>
      <p>Bereits registriert? <button onClick={() => navigate("/login")}>Zum Login</button></p>
    </div>
  );
};

export default Register;
