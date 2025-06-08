import { useLocation, useNavigate } from "react-router-dom";

function Submit() {
  const location = useLocation();
  const navigate = useNavigate();
  const fData = location.state;

  const containerStyle = {
    background: "transparent",
    padding: "2rem",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "600px",
    margin: "auto",
    color: "var(--form-text)",
    backgroundColor: "var(--form-bg)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    outline: "2px solid #000000",
    outlineOffset: "2px",
  };

  if (!fData) {
    return (
      <div className="error">
        <h2>No data submitted</h2>
        <button onClick={() => navigate("/")} style={buttonStyle}>
          Go Back to Form
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2>Submitted Details</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>First Name:</strong> {fData.firstName}
        </li>
        <li>
          <strong>Last Name:</strong> {fData.lastName}
        </li>
        <li>
          <strong>Username:</strong> {fData.username}
        </li>
        <li>
          <strong>Email:</strong> {fData.email}
        </li>
        <li>
          <strong>Phone:</strong> {fData.countryCode} {fData.phoneNumber}
        </li>
        <li>
          <strong>Country:</strong> {fData.country}
        </li>
        <li>
          <strong>State:</strong> {fData.state}
        </li>
        <li>
          <strong>City:</strong> {fData.city}
        </li>
        <li>
          <strong>PAN:</strong> {fData.pan}
        </li>
        <li>
          <strong>Aadhaar:</strong> {fData.aadhar}
        </li>
      </ul>
      <button onClick={() => navigate("/")} style={buttonStyle}>
        Go Back
      </button>
    </div>
  );
}

export default Submit;
