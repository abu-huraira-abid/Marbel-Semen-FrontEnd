import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCreditCard, FaMoneyCheckAlt, FaShippingFast } from "react-icons/fa";

export default function OrderProcess() {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6">Our Order Process</h2>
        <p className="text-muted">
          Follow these simple steps to complete your order and arrange shipping.
        </p>
      </div>

      {/* Steps Section */}
      <div className="row g-4">
        {/* Step 1 */}
        <div className="col-md-4">
          <div className="card h-100 shadow-lg border-0 text-center p-4 rounded-4 hover-zoom">
            <div className="mb-3 text-primary">
              <FaEnvelope size={40} />
            </div>
            <h5 className="fw-bold">Invoice via Email</h5>
            <p className="text-muted">
              Upon placing your order, you will receive an invoice directly in your inbox.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="col-md-4">
          <div className="card h-100 shadow-lg border-0 text-center p-4 rounded-4 hover-zoom">
            <div className="mb-3 text-success">
              <FaCreditCard size={40} />
            </div>
            <h5 className="fw-bold">Credit Card Payment</h5>
            <p className="text-muted">
              If paid by credit card, you’ll receive a release email to contact the storage facility and arrange shipping.  
              <br />
              <span className="fw-semibold text-danger">Shipping is always at the buyer’s expense.</span>
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="col-md-4">
          <div className="card h-100 shadow-lg border-0 text-center p-4 rounded-4 hover-zoom">
            <div className="mb-3 text-warning">
              <FaMoneyCheckAlt size={40} />
            </div>
            <h5 className="fw-bold">Check Payment</h5>
            <p className="text-muted">
              If paid by check, the release email will be issued once funds are cleared by our main office.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-5">
        <div className="card shadow-lg border-2 border-light rounded-4">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-3 text-center">Contact Us</h4>
            <div className="row g-4 text-center">
              <div className="col-md-4 d-flex flex-column align-items-center mt-2">
                <FaMapMarkerAlt className="text-danger mb-2" size={30} />
                <p className="mb-0 fw-semibold">1866 Omni Blvd</p>
                <p className="text-muted">Mount Pleasant, SC 29466</p>
              </div>
              <div className="col-md-4 d-flex flex-column align-items-center">
                <FaPhoneAlt className="text-success mb-2" size={30} />
                <p className="mb-0 fw-semibold">305-923-1730</p>
              </div>
              <div className="col-md-4 d-flex flex-column align-items-center">
                <FaEnvelope className="text-primary mb-2" size={30} />
                <p className="mb-0 fw-semibold">marblesemenentry@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
