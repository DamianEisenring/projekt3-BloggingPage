import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import "./login.css"; // Spezifisches CSS für Login

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard"); // Nach Login weiterleiten
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Kein Konto?{" "}
        <button onClick={() => navigate("/register")}>Registrieren</button>
      </p>
    </div>
  );
};

export default Login;
