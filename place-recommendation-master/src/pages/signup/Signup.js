import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

//styles
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileError, setProfileError] = useState(null);

  const { signup, error, isPending } = useSignup();

  const handleClick = (e) => {
    e.preventDefault();

    console.log(name, email, password);
    signup(email, password, name);
  };

  const handleFileChanged = (e) => {
    setProfileImage(null);
    let selectedFile = e.target.files[0];

    if (!selectedFile.type.includes["image"]) {
      setProfileError("Please select an image");
      return;
    }

    setProfileError(null);
    setProfileImage(selectedFile);
    console.log(selectedFile);
  };

  return (
    <form className="signup-form" onSubmit={handleClick}>
      <h2>Sign up</h2>
      <label>
        <span>Name</span>
        <input
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>

      <label>
        <span>Email</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

     

      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
}
