import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Img from '../../../src/assets/media/Crausal3.png'

export default function SecondCard() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/queries/`, formData);

      // ✅ Success Alert
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your message has been submitted successfully.",
        showConfirmButton: false,
        timer: 2000,
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      // ✅ Error Alert
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error.response?.data?.detail ||
          "Something went wrong. Please try again later.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row gx-0">
      <div className="col-lg-6">
        <div className="m-3 m-lg-5">
          <img
            src={Img}
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
  );
}
