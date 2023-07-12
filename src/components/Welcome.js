import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";

//icons
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  function emailHandler(e) {
    setEmail(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }
  function signInHandler() {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/homepage"))
      .catch((err) => alert(err.message));

    setIsRegistering(false);
  }

  function handleRegister() {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Emails not same .Please check emails.");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Passwords not same.Please check passwords.");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="welcome-container">
      {isRegistering ? (
        <>
          <h1 className="register-title">Register</h1>
          <div className="inputs">
            <input
              className="input-1"
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
            />
            <input
              className="input-1"
              type="email"
              placeholder="Confirm Email"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value,
                })
              }
            />
            <input
              className="input-1"
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
            />
            <input
              className="input-1"
              type="password"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <Button
            style={{ marginTop: "12px", marginBottom: "12px" }}
            onClick={() => handleRegister()}
            variant="contained"
            size="large"
          >
            Register
          </Button>
          <Button onClick={() => setIsRegistering(false)} size="small" class='btn btn-primary' style={{minWidth:'150px'}} variant="contained">
            <FaLongArrowAltLeft
              color="white"
              style={{ marginRight: "6px" }}
              size={16}
            />
            Go Back
          </Button>
        </>
      ) : (
        <>
          <h1 className="login-title">Login</h1>
          <div className="inputs">
            <input className="input-1" placeholder="Email" onChange={emailHandler} value={email} />
            <input
            placeholder="Password"
              className="input-2"
              onChange={passwordHandler}
              value={password}
              type="password"
            />
          </div>
          <Button
            style={{ marginBottom: "10px" }}
            onClick={() => signInHandler()}
            variant="contained"
          >
            Login
          </Button>
          <Button onClick={() => setIsRegistering(true)} style={{minWidth:'200px'}} variant="contained">
            Create An Account
          </Button>
        </>
      )}
    </div>
  );
}
