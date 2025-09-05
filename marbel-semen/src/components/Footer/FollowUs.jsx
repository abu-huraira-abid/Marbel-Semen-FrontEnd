export default function FollowUs() {
  return (
    <div className="site-links-section py-5">
      <div className="container">
        <h2 className="mb-4" style={{ fontFamily: "Syne" }}>
          Follow Us
        </h2>
        <div className="border border-primary"></div>
        <div className="fs-5 my-3" style={{ fontFamily: "Poppins" }}>
          Let&apos;s follow to stay connected with us.
        </div>

        {/* Social Icons */}
        <div className="d-flex gap-4 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon fs-5">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon fs-5">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon fs-5">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
