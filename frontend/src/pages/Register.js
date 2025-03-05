import React, { useState } from "react";
import { register } from "../api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
    <div>
      <h2>Registrieren</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
};

export default Register;
