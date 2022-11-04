import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/config";
import "../App.css";

function ViewSessionsPage() {
  const [subjectCode, setSubjectCode] = useState("");
  let content = '';
  let counter = 0;

  const navigate = useNavigate();

  const onChangeSubjectCode = (event) => {
    setSubjectCode(event.target.value)
  }

  const onGetSessionIds = async () => {
    try {
      const response = await instance.post(
        `/sessionId/viewsessions`,
        {
            subjectCode
        }
      );

      //navigate("/home");
      if (response) { //change to (if response = 200) or something later
        let sessionIds = (response.data);
        for (let s of sessionIds) {
          counter += 1;
          content += '<fieldset>'
          content += 'Session ID: ' + s.sessionId + ' - '
          content += '<strong>'
          content += s.startDateTime + ' - ' + s.endDateTime
          content += '</strong>'
          content += '<small>'
          content += ' (Instructed by Tutor #' + s.tutorNo + ')';
          content += '</small>'
          content += '</fieldset>'
        }

        let prodDiv = document.getElementById('prodDiv');
        prodDiv.innerHTML = content;
      }

    } catch (error) {
      alert(error);
    }
  };


  return (
      <div className="App background">
        <h1 className="title">View Sessions</h1>
        <form id="viewSessions" onSubmit={onGetSessionIds()} onSubmit="return false">
          <div>
          <label for="subjectCode" className="text-input-title-text">Subject Code: </label>
          <input type="text" min="0000" max="9999" id="subjectCode" value={subjectCode} onChange={onChangeSubjectCode} className="text-input"></input>
          </div>
        </form>
        <br></br>
        <div id='prodDiv'>
          <br></br>
        </div>
      </div>
    );
}

export default ViewSessionsPage;