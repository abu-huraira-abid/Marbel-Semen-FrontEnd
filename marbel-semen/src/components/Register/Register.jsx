import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container d-flex flex-column shadow p-5 bg-white rounded">
        <h1 className="my-2 text-center" style={{ fontFamily: "Syne" }}>
          Register Account
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
              placeholder="Enter username"
            />
          </div>

          {/* Email Field */}
          <div className="my-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control rounded-0 py-3"
              placeholder="Enter email"
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
                placeholder="Enter password"
              />
              <button
                type="button"
                className="btn btn-sm position-absolute border-0 bg-transparent"
                style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
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

          {/* Confirm Password Field */}
          <div className="my-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                className="form-control rounded-0 py-3 pe-5"
                placeholder="Confirm password"
              />
              <button
                type="button"
                className="btn btn-sm position-absolute border-0 bg-transparent"
                style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i
                  className={`fas ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  } fa-lg text-secondary`}
                ></i>
              </button>
            </div>
          </div>

          {/* Register Button */}
          <div className="text-center">
            <button className="btn btn-lg btn-outline-primary my-3 rounded-0 px-5">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
