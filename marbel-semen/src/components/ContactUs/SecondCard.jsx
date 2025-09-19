import { useState, useEffect } from "react";
import axios from "axios";

export default function SecondCard() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      await axios.post(`${BASE_URL}/queries/`, formData);
      setAlert({
        type: "success",
        message: "Your message has been submitted successfully!",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setAlert({
        type: "danger",
        message:
          error.response?.data?.detail ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto dismiss alert after 3s
  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <>
      <div className="row gx-0">
        <div className="col-lg-6">
          <div className="m-3 m-lg-5">
            <img
              src="https://copilot.microsoft.com/th/id/BCO.d0ceee66-65c1-4f2b-9696-c7423587deae.png"
              alt="Contact Us"
              className="img-fluid rounded-4"
            />
          </div>
        </div>
        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center px-3 my-5 my-lg-0">
          <h1
            className="text-center text-primary my-2 fw-bold"
            style={{ fontFamily: "Syne" }}
          >
            Contact us
          </h1>

          {/* ✅ Bootstrap alert with close button */}
          {alert.message && (
            <div
              className={`alert alert-${alert.type} alert-dismissible fade show w-75 text-center`}
              role="alert"
            >
              {alert.message}
              <button
                type="button"
                className="btn-close"
                onClick={() => setAlert({ type: "", message: "" })}
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-75">
            <div className="my-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="form-control py-2 rounded-0"
                required
              />
            </div>
            <div className="my-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="form-control py-2 rounded-0"
                required
              />
            </div>
            <div className="my-4">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="form-control py-2 rounded-0"
              />
            </div>
            <div className="my-4">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control rounded-0"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg mt-2 rounded-1 w-100 d-flex align-items-center justify-content-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
