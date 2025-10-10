import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginApi from "./utils/LoginApi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await LoginApi(formData);

    // console.log(res.data)
    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You will be redirected shortly...",
        showConfirmButton: false,
        timer: 1500,
      });
      res.data.user.role == 'admin' ? setTimeout(() => navigate("/account/dashboard"), 1500) : setTimeout(() => navigate("/account/user/dashboard"), 1500)
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: res.message || "Invalid email or password. Please try again.",
        confirmButtonColor: "#d33",
      });
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-2 my-lg-0">
      <div className="container d-flex flex-column shadow p-5 bg-white rounded" style={{ maxWidth: "500px" }}>
        <h1 className="my-2 text-center" style={{ fontFamily: "Syne" }}>
          My Account
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Username/Email Field */}
          <div className="my-3">
            <label htmlFor="email" className="form-label">
              Username/Email:
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control rounded-0 py-3"
              placeholder="Enter username or email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="my-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="form-control rounded-0 py-3 pe-5"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-sm position-absolute border-0 bg-transparent"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } fa-lg text-secondary`}
                ></i>
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="d-flex justify-content-between align-items-center my-2">
            <a href="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-lg btn-primary my-3 rounded-0 px-5"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
