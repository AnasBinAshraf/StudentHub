import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    console.log("Login:", email, password);
  }

  return (
    <div className="login-page">
      <div className="login-box">

        <h1>Welcome back</h1>

        <p className="login-subtitle">
          Login to your StudentHub account.
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <button type="submit">
            Login
          </button>

        </form>

        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;