import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setToken, setUserType }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { token, userType } = res.data;

      setAlert({ type: "success", message: "Login successful!" });

      // Store token and userType in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);
      setToken(token);
      setUserType(userType);

      // Redirect based on userType
      if (userType === "business") {
        navigate("/Auth/Business");
      } else if (userType === "customer") {
        navigate("/Auth/Customer");
      } else {
        navigate("/");
      }
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Login failed.",
      });
      console.error(err.response?.data);
    }
  };

  return (
    <div className="max-w-md min-h-[82vh] mx-auto p-6">
      {alert.message && (
        <div
          className={`alert ${
            alert.type === "success" ? "alert-success" : "alert-error"
          } mb-4`}
        >
          <div className="flex-1">
            <label className="sr-only">
              {alert.type === "success" ? "Success" : "Error"}
            </label>
            {alert.message}
          </div>
        </div>
      )}
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
