import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebase.config";
import { useNavigate } from "react-router-dom";

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
    createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(registerInformation.email);
  return (
    <div className="welcome-container">
      {isRegistering ? (
        <>
          <input
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
          <Button onClick={() => handleRegister()} variant="contained">
            Register
          </Button>
          <Button onClick={() => setIsRegistering(false)} variant="contained">
            go Back
          </Button>
        </>
      ) : (
        <>
          <h1>Login</h1>
          <div className="login-inputs">
            <input className="input-1" onChange={emailHandler} value={email} />
            <input
              className="input-2"
              onChange={passwordHandler}
              value={password}
              type="password"
            />
          </div>
          <Button onClick={() => signInHandler()} variant="contained">
            Login
          </Button>
          <Button onClick={() => setIsRegistering(true)} variant="contained">
            Create An Account
          </Button>
        </>
      )}
    </div>
  );
}
