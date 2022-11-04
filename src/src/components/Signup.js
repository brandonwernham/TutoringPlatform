import { useState } from 'react';
import { Link } from 'react-router-dom';

import "./Signup.css";

function Signup() {
    const [accountType, setAccountType] = useState(0);

    const onClickSignUp = () => {
        if (accountType == 1){
          window.location.href = '/sign-upTutor';
        }
        else if (accountType == 0){
          window.location.href = '/sign-upStudent';
        }
      }

    const onClickRadio = (event) => {
        setAccountType(event.target.value == "Tutor" ? 1 : 0)
      };


      return (
        <div className="App background">
          <h1 className="title">Online Tutoring</h1>
          <h2>{accountType == 1 ? "Tutor" : "Student"} Signup </h2>
            <form style={{ marginTop: 20 }}>
            <input checked={accountType == 0} type="radio" id="student" value="Student" onClick={onClickRadio} />
              <label for="Student" style={{ marginRight: 20 }} >Student</label>
              <input checked={accountType == 1} type="radio" id="tutor" value="Tutor" onClick={onClickRadio} />
              <label for="Student">Tutor</label>
              </form>
          <button className="button" onClick={onClickSignUp} style={{ marginTop: 30 }}>Continue</button>
    
          <Link to="/">
            Go To Login
          </Link>
        </div>
      );

}
export default Signup;