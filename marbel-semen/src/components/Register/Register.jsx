import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Password confirmation check
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please make sure both passwords are the same.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_REGISTER,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      let message = "Something went wrong. Please try again.";

      if (err.response && err.response.data) {
        const detail = err.response.data.detail || JSON.stringify(err.response.data);
        message = detail;
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container d-flex flex-column shadow p-5 bg-white rounded">
        <h1 className="my-2 text-center" style={{ fontFamily: "Syne" }}>
          Register Account
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="my-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control rounded-0 py-3"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="my-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control rounded-0 py-3"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="my-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="form-control rounded-0 py-3 pe-5"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-sm position-absolute border-0 bg-transparent"
                style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} fa-lg text-secondary`}></i>
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="my-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                className="form-control rounded-0 py-3 pe-5"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-sm position-absolute border-0 bg-transparent"
                style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} fa-lg text-secondary`}></i>
              </button>
            </div>
          </div>

          {/* Register Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-lg btn-outline-primary my-3 rounded-0 px-5"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
