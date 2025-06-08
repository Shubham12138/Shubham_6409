import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const countries = [
  "India",
  "USA",
  "UK",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "Brazil",
];

const statesByCountry = {
  India: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal"],
  USA: ["California", "Texas", "New York", "Florida", "Illinois"],
  UK: ["England", "Scotland", "Wales", "Northern Ireland", "Cornwall"],
  Australia: [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "Tasmania",
  ],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
  Germany: ["Bavaria", "Berlin", "Hamburg", "Hesse", "Saxony"],
  France: [
    "Île-de-France",
    "Provence-Alpes-Côte d'Azur",
    "Auvergne-Rhône-Alpes",
    "Occitanie",
    "Nouvelle-Aquitaine",
  ],
  Japan: ["Tokyo", "Osaka", "Kyoto", "Hokkaido", "Fukuoka"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Bahia", "Paraná", "Ceará"],
};

const citiesByState = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Karol Bagh", "Saket"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
  ],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
  California: [
    "Los Angeles",
    "San Francisco",
    "San Diego",
    "Sacramento",
    "San Jose",
  ],
  Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
  "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse"],
  Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"],
  Illinois: ["Chicago", "Aurora", "Naperville", "Joliet", "Springfield"],
  England: ["London", "Manchester", "Liverpool", "Bristol", "Leeds"],
  Scotland: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness"],
  Wales: ["Cardiff", "Swansea", "Newport", "Wrexham", "Bangor"],
  "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry", "Armagh"],
  Cornwall: ["Truro", "Falmouth", "Penzance", "St Ives", "Bodmin"],
  "New South Wales": [
    "Sydney",
    "Newcastle",
    "Wollongong",
    "Albury",
    "Coffs Harbour",
  ],
  Victoria: ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton"],
  Queensland: ["Brisbane", "Gold Coast", "Cairns", "Townsville", "Toowoomba"],
  "Western Australia": ["Perth", "Fremantle", "Mandurah", "Albany", "Bunbury"],
  Tasmania: ["Hobart", "Launceston", "Devonport", "Burnie", "Ulverstone"],
  Ontario: ["Toronto", "Ottawa", "Hamilton", "Kitchener", "London"],
  Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil"],
  "British Columbia": [
    "Vancouver",
    "Victoria",
    "Surrey",
    "Burnaby",
    "Richmond",
  ],
  Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert"],
  Manitoba: [
    "Winnipeg",
    "Brandon",
    "Steinbach",
    "Thompson",
    "Portage la Prairie",
  ],
  Bavaria: ["Munich", "Nuremberg", "Augsburg", "Regensburg", "Würzburg"],
  Berlin: ["Berlin"],
  Hamburg: ["Hamburg"],
  Hesse: ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach"],
  Saxony: ["Dresden", "Leipzig", "Chemnitz", "Zwickau", "Plauen"],
  "Île-de-France": [
    "Paris",
    "Boulogne-Billancourt",
    "Saint-Denis",
    "Argenteuil",
    "Montreuil",
  ],
  "Provence-Alpes-Côte d'Azur": [
    "Marseille",
    "Nice",
    "Toulon",
    "Aix-en-Provence",
    "Avignon",
  ],
  "Auvergne-Rhône-Alpes": [
    "Lyon",
    "Saint-Étienne",
    "Grenoble",
    "Clermont-Ferrand",
    "Valence",
  ],
  Occitanie: ["Toulouse", "Montpellier", "Nîmes", "Perpignan", "Béziers"],
  "Nouvelle-Aquitaine": [
    "Bordeaux",
    "Limoges",
    "Poitiers",
    "Pau",
    "La Rochelle",
  ],
  Tokyo: ["Chiyoda", "Shinjuku", "Shibuya", "Taito", "Minato"],
  Osaka: ["Osaka", "Sakai", "Higashiosaka", "Toyonaka", "Moriguchi"],
  Kyoto: ["Kyoto", "Uji", "Kameoka", "Nagaokakyo", "Muko"],
  Hokkaido: ["Sapporo", "Asahikawa", "Hakodate", "Obihiro", "Kushiro"],
  Fukuoka: ["Fukuoka", "Kitakyushu", "Kurume", "Omuta", "Iizuka"],
  "São Paulo": [
    "São Paulo",
    "Campinas",
    "Santos",
    "São Bernardo do Campo",
    "Ribeirão Preto",
  ],
  "Rio de Janeiro": [
    "Rio de Janeiro",
    "Niterói",
    "Nova Iguaçu",
    "Duque de Caxias",
    "São Gonçalo",
  ],
  Bahia: [
    "Salvador",
    "Feira de Santana",
    "Vitória da Conquista",
    "Camaçari",
    "Ilhéus",
  ],
  Paraná: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Foz do Iguaçu"],
  Ceará: ["Fortaleza", "Sobral", "Juazeiro do Norte", "Maracanaú", "Crato"],
};

function Form() {
  const [fData, setFData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    countryCode: "+91",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errs, setErrs] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Special handling for PAN number
    if (name === "pan") {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    }
    // Special handling for Aadhar number
    else if (name === "aadhar") {
      processedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .slice(0, 14);
    }
    // Special handling for phone number
    else if (name === "phoneNumber") {
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFData({
      ...fData,
      [name]: processedValue,
    });

    const error = validateField(name, processedValue.replace(/\s/g, ""));
    setErrs({
      ...errs,
      [name]: error,
    });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return value.trim() === "" ? "First name is required" : "";
      case "lastName":
        return value.trim() === "" ? "Last name is required" : "";
      case "username":
        return value.trim() === "" ? "Username is required" : "";
      case "email":
        return value.trim() === ""
          ? "Email is required"
          : !/^\S+@\S+\.(com|in|org)$/.test(value)
          ? "Email must end with .com, .in, or .org"
          : "";
      case "password":
        return value.trim() === ""
          ? "Password is required"
          : value.length < 8
          ? "Password must be at least 8 characters"
          : "";
      case "phoneNumber":
        return value.trim() === ""
          ? "Phone number is required"
          : !/^\d{10}$/.test(value)
          ? "Phone number must be exactly 10 digits"
          : "";
      case "country":
        return value.trim() === "" ? "Country is required" : "";
      case "state":
        return value.trim() === "" ? "State is required" : "";
      case "city":
        return value.trim() === "" ? "City is required" : "";
      case "pan":
        return value.trim() === ""
          ? "PAN number is required"
          : !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)
          ? "PAN must be 5 letters + 4 numbers + 1 letter (e.g., ABCDE1234F)"
          : "";
      case "aadhar":
        const digitsOnly = value.replace(/\s/g, ""); // Remove spaces for validation
        return digitsOnly === ""
          ? "Aadhar number is required"
          : !/^\d{12}$/.test(digitsOnly)
          ? "Aadhar number must be exactly 12 digits"
          : "";
      case "countryCode":
        return value.trim() === "" ? "Country code is required" : "";
      default:
        return "";
    }
  };

  const validate = () => {
    const newErrs = {};

    newErrs.firstName = validateField("firstName", fData.firstName);
    newErrs.lastName = validateField("lastName", fData.lastName);
    newErrs.username = validateField("username", fData.username);
    newErrs.email = validateField("email", fData.email);
    newErrs.password = validateField("password", fData.password);
    newErrs.countryCode = validateField("countryCode", fData.countryCode);
    newErrs.phoneNumber = validateField("phoneNumber", fData.phoneNumber);
    newErrs.country = validateField("country", fData.country);
    newErrs.state = validateField("state", fData.state);
    newErrs.city = validateField("city", fData.city);
    newErrs.pan = validateField("pan", fData.pan);
    newErrs.aadhar = validateField("aadhar", fData.aadhar);

    setErrs(newErrs);

    // Check if there are any error messages
    return !Object.values(newErrs).some((error) => error !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      console.log("Form validation failed");
      return;
    }

    console.log("Form submitted successfully");
    navigate("/Submit", { state: fData });
  };

  const isFormValid = () => {
    return (
      fData.firstName.trim() !== "" &&
      fData.lastName.trim() !== "" &&
      fData.username.trim() !== "" &&
      /^\S+@\S+\.(com|in|org)$/.test(fData.email) &&
      fData.password.length >= 8 &&
      fData.countryCode !== "" &&
      /^\d{10}$/.test(fData.phoneNumber) &&
      fData.country !== "" &&
      fData.state !== "" &&
      fData.city !== "" &&
      /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(fData.pan) &&
      /^\d{12}$/.test(fData.aadhar.replace(/\s/g, ""))
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        width: "200%",
        maxWidth: "3000px",

        margin: "60px auto",
        padding: "30px",
      }}
    >
      <h1 className="form-title">Validation Form</h1>

      <div>
        <label>First Name </label>
        <input
          type="text"
          name="firstName"
          value={fData.firstName}
          onChange={handleChange}
          className={
            errs.firstName ? "invalid" : fData.firstName ? "valid" : ""
          }
        />
        {errs.firstName && <p className="error">{errs.firstName}</p>}
      </div>

      <div>
        <label>Last Name </label>
        <input
          type="text"
          name="lastName"
          value={fData.lastName}
          onChange={handleChange}
          className={errs.lastName ? "invalid" : fData.lastName ? "valid" : ""}
        />
        {errs.lastName && <p className="error">{errs.lastName}</p>}
      </div>

      <div>
        <label>Username </label>
        <input
          type="text"
          name="username"
          value={fData.username}
          onChange={handleChange}
          className={errs.username ? "invalid" : fData.username ? "valid" : ""}
        />
        {errs.username && <p className="error">{errs.username}</p>}
      </div>

      <div>
        <label>Email </label>
        <input
          type="email"
          name="email"
          value={fData.email}
          onChange={handleChange}
          className={errs.email ? "invalid" : fData.email ? "valid" : ""}
          placeholder="example@domain.com"
        />
        {errs.email && <p className="error">{errs.email}</p>}
      </div>

      <div>
        <label>Password </label>
        <input
          type={fData.showPassword ? "text" : "password"}
          name="password"
          value={fData.password}
          onChange={handleChange}
          className={errs.password ? "invalid" : fData.password ? "valid" : ""}
          placeholder="Enter password (min. 8 characters)"
        />
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
            userSelect: "none",
            marginTop: "5px",
          }}
        >
          <input
            type="checkbox"
            name="showPassword"
            checked={fData.showPassword}
            onChange={(e) => {
              setFData({
                ...fData,
                showPassword: e.target.checked,
              });
            }}
            style={{ margin: 0 }}
          />
          {fData.showPassword ? "Hide" : "Show"} Password
        </label>
        {errs.password && <p className="error">{errs.password}</p>}
      </div>

      <div className="phone-input-container">
        <div>
          <label>Country Code</label>
          <select
            name="countryCode"
            value={fData.countryCode}
            onChange={handleChange}
            className={
              errs.countryCode ? "invalid" : fData.countryCode ? "valid" : ""
            }
          >
            <option value="">Select Code</option>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          {errs.countryCode && <p className="error">{errs.countryCode}</p>}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={fData.phoneNumber}
            onChange={handleChange}
            className={
              errs.phoneNumber ? "invalid" : fData.phoneNumber ? "valid" : ""
            }
            placeholder="1234567890"
          />
          {errs.phoneNumber && <p className="error">{errs.phoneNumber}</p>}
        </div>
      </div>

      <div>
        <label>Country </label>
        <select
          name="country"
          value={fData.country}
          onChange={handleChange}
          className={errs.country ? "invalid" : fData.country ? "valid" : ""}
        >
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errs.country && <p className="error">{errs.country}</p>}
      </div>

      <div>
        <label>State </label>
        <select
          name="state"
          value={fData.state}
          onChange={handleChange}
          disabled={!fData.country}
          className={errs.state ? "invalid" : fData.state ? "valid" : ""}
        >
          <option value="">Select state</option>
          {(statesByCountry[fData.country] || []).map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
        {errs.state && <p className="error">{errs.state}</p>}
      </div>

      <div>
        <label>City </label>
        <select
          name="city"
          value={fData.city}
          onChange={handleChange}
          disabled={!fData.state}
          className={errs.city ? "invalid" : fData.city ? "valid" : ""}
        >
          <option value="">Select city</option>
          {(citiesByState[fData.state] || []).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errs.city && <p className="error">{errs.city}</p>}
      </div>

      <div>
        <label>PAN No. </label>
        <input
          type="text"
          name="pan"
          value={fData.pan}
          onChange={handleChange}
          maxLength={10}
          placeholder="ABCDE1234F"
          className={
            errs.pan
              ? "invalid"
              : fData.pan && /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(fData.pan)
              ? "valid"
              : ""
          }
        />
        {errs.pan && <p className="error">{errs.pan}</p>}
      </div>

      <div>
        <label>Aadhar No. </label>
        <input
          type="text"
          name="aadhar"
          value={fData.aadhar}
          onChange={handleChange}
          maxLength={14}
          className={errs.aadhar ? "invalid" : fData.aadhar ? "valid" : ""}
          placeholder="1234 5678 9012"
        />
        {errs.aadhar && <p className="error">{errs.aadhar}</p>}
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={!isFormValid()}
        data-tooltip={
          !isFormValid() ? "Please fill in all required fields correctly" : ""
        }
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
