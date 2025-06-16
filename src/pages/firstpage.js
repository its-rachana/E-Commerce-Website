"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FirstPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [useSSO, setSSO] = useState(true);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAuth = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const endpoint = isLogin ? "/login" : "/register";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/homepage");
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  const handleSSOLogin = () => {
  window.location.href = "http://localhost:3000/auth/google";
};

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className={`form-control ${emailError ? "is-invalid" : ""}`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (!validateEmail(e.target.value)) {
              setEmailError("Please enter a valid email address.");
            } else {
              setEmailError("");
            }
          }}
        />
        {emailError && <div className="invalid-feedback">{emailError}</div>}
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-danger">{error}</p>}

      <button
        className="btn btn-primary w-100 mb-2"
        onClick={handleAuth}
        disabled={!!emailError || !email || !password}
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <button
        className="btn btn-secondary w-100 mb-2"
        onClick={() => setIsLogin(!isLogin)}
      >
        Switch to {isLogin ? "Sign Up" : "Login"}
      </button>

      <hr />

      <a
        href="http://localhost:3000/auth/google"
        className="btn btn-outline-danger w-100 mt-2"
      >
        Login with Google
      </a>
    </div>
  );
}
