import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/config";

import "../App.css";
import "./LoginPage.css";

import { saveNo } from "../auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(0);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePasswordText = (event) => {
    setPassword(event.target.value);
  };

  const onClickSignIn = async () => {
    const signInSubRoute = accountType == 1 ? "tutor" : "student";
    //navigate("/home");
    try {
      const response = await instance.post(
        `/sign-in/${signInSubRoute}`,
        {
          email,
          password,
        }
      );

      if (response) {
        // TODO: change to (if response = 200) or something later
        if (signInSubRoute == "student") {
          const studentNo = response.data[0].studentNo
          saveNo("student", studentNo)
        } else {
          const tutorNo = response.data[0].tutorNo
          saveNo("tutor", tutorNo)
        }

        navigate(signInSubRoute == "student" ? "/home" : "/tutorreview");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRadio = (event) => {
    setAccountType(event.target.value == "Tutor" ? 1 : 0);
  };

  return (
    <div className="App background">
      <h1 className="title">Online Tutoring</h1>
      <div>
        <h2 style={{ marginBottom: 30 }}>{accountType == 1 ? "Tutor" : "Student"} Login</h2>
        <form>
          <div className="input-container">
            <p className="text-input-title-text">Email</p>
            <input className="text-input" type="text" value={email} onChange={onChangeEmail} />
          </div>
          <div className="input-container">
            <p className="text-input-title-text">Password</p>
            <input className="text-input" type="password" value={password} onChange={onChangePasswordText} />
          </div>
          <form style={{ marginTop: 20 }}>
            <input
              checked={accountType == 0}
              type="radio"
              id="student"
              value="Student"
              onClick={onClickRadio}
            />
            <label for="Student" style={{ marginRight: 20 }}>
              Student
            </label>
            <input
              checked={accountType == 1}
              type="radio"
              id="tutor"
              value="Tutor"
              onClick={onClickRadio}
            />
            <label for="Student">Tutor</label>
          </form>
        </form>
        <div className="button-container">
          <button className="button" onClick={onClickSignIn} style={{ marginTop: 30 }}>
            Sign In
          </button>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
