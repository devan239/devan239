import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isPending } = useLogin();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
    
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Login </h2>

      <label>
        <span>Email id:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>

      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}

      {error && <div className="error">{error}</div>}
    </form>
  );
}
