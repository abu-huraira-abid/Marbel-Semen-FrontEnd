import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="d-flex justify-content-center align-items-center my-2 my-lg-0">
      <div className="container d-flex flex-column shadow p-5 bg-white rounded">
        <h1 className="my-2 text-center" style={{ fontFamily: "Syne" }}>
          My Account
        </h1>
        <form action="">
          {/* Username Field */}
          <div className="my-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control rounded-0 py-3"
              placeholder="Enter username or email"
            />
          </div>

          {/* Password Field with Eye Icon */}
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
            <button className="btn btn-lg btn-primary my-3 rounded-0 px-5">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
