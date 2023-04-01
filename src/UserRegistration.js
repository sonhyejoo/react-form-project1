import { useState, useEffect } from "react";

export default function UserRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [staff, setStaff] = useState("");
  const [bio, setBio] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const handlePhone = (value) => {
    const formattedPhone = formatPhone(value);
    setPhone(formattedPhone);
  };

  function formatPhone(value) {
    if (!value) return value;
    const phoneNum = value.replace(/[^\d]/g, "");
    const phoneLength = phoneNum.length;
    if (phoneLength < 4) return phoneNum;
    if (phoneLength < 7) {
      return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3)}`;
    }
    return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3, 6)}-${phoneNum.slice(
      6,
      10
    )}`;
  }

  useEffect(() => {
    let errors = [];
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!(name.length > 0)) errors.push("Please enter your name");
    if (!regexEmail.test(email))
      errors.push("Please enter a valid email address");
    if (!phoneType) {
      errors.push("Please select what type of phone was entered");
    }
    setValidationErrors(errors);
  }, [name, email, phoneType]);
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (validationErrors.length > 0) {
      alert("Cannot Submit");
      return;
    }
    const userRegInfo = {
      name,
      email,
      phone,
      phoneType,
      staff,
      bio,
      sendEmail,
      submittedOn: new Date(),
    };
    console.log(userRegInfo);
    setName("");
    setEmail("");
    setPhone("");
    setPhoneType("");
    setStaff("");
    setBio("");
    setSendEmail(false);
    setSubmitted(false);
  }
  return (
    <>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        {submitted && validationErrors.length > 0 && (
          <div>
            The following errors were found:
            <ul>
              {validationErrors.map((error) => {
                return <li key={error}>{error}</li>;
              })}
            </ul>
          </div>
        )}
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            id="phone"
            type="text"
            onChange={(e) => handlePhone(e.target.value)}
            value={phone}
          />
          <select
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value="" disabled>
              What kind of phone?
            </option>
            <option value="Home">Home</option>
            <option value="Mobile">Mobile</option>
            <option value="Work">Work</option>
          </select>
        </div>
        <div>
          <label>
            Staff:
            <input
              name="staff"
              type="radio"
              onChange={(e) => setStaff(e.target.value)}
              value="Instructor"
            />
            Instructor
          </label>
          <label>
            <input
              name="staff"
              type="radio"
              onChange={(e) => setStaff(e.target.value)}
              value="Student"
            />
            Student
          </label>
        </div>
        <div>
          <label htmlFor="bio">Bio: </label>
          <textarea
            id="bio"
            type="text"
            onChange={(e) => setBio(e.target.value.slice(0, 280))}
            value={bio}
          />
        </div>
        <div>
          <label htmlFor="emailSign">
            <input
              name="emailSign"
              type="checkbox"
              onChange={(e) => setSendEmail(e.target.checked)}
              checked={sendEmail}
            />
            Check if you would like to receive emails from us
          </label>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}
