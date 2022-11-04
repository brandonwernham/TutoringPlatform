import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/config";
import "../App.css";

function ViewReviewPage() {
  const [tutorNo, setTutorNo] = useState("");
  let content = '';
  let counter = 0;

  const navigate = useNavigate();

  const onChangeTutorNo = (event) => {
    setTutorNo(event.target.value)
  }

  const onGetReviews = async () => {
    // Get tutorNo value
    try {
      const response = await instance.post(
        `/tutorreview/viewposts`,
        {
          tutorNo
        }
      );
      if (response) { //change to (if response = 200) or something later
        let reviews = (response.data);
        
        for (let r of reviews) {
          counter += 1;
          content += '<fieldset>'
          // Prints review ID and rating
          content += '#' + r.reviewId + " (" + r.rating + "/5): "
          content += '\n'
          content += '<strong>'
          // Prints review title
          content += r.title
          content += '</strong>'
          content += '<br>'
          content += '"'
          // Prints review description
          content += r.description
          content += '"'
          content += '<br>'
          content += '<small>'
          // Prints date and studentNo who posted it
          content += 'Posted by Student #' + r.studentNo + ' on ' + r.datePosted + '.';
          content += '</small>'
          content += '</fieldset>'
        }

        // Updates div with reviews
        let prodDiv = document.getElementById('prodDiv');
        prodDiv.innerHTML = content;
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
      <div className="App background">
        <h1 className="title">View Reviews</h1>
        <form id="viewReviews" onSubmit={onGetReviews()} onSubmit="return false">
          <div>
          <label for="tutorNo" className="text-input-title-text">Tutor No: </label>
          <input type="text" min="0000" max="9999" id="tutorNo" value={tutorNo} onChange={onChangeTutorNo} className="text-input"></input>
          </div>
        </form>
        <br></br>
        <div id='prodDiv'>
          <br></br>
        </div>
      </div>
    );
}

export default ViewReviewPage;
