import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/config";
import "../App.css";
import { getNo } from "../auth";

function AddReviewPage() {
  const [tutorNo, setTutorNo] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [desc, setDesc] = useState("");
  const [revID, setRevID] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const onChangeTutorNo = (event) => {
    setTutorNo(event.target.value)
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const onChangeRating = (event) => {
    setRating(event.target.value)
  }

  const onChangeDesc = (event) => {
    setDesc(event.target.value)
  }

  const getNewData = async () => {
    // TODO: get saved studentNo
    
    const resRevID = await instance.post(`/getReviewID`);
    let date = new Date().toISOString().slice(0, 10);

    onClickSubmitReview(resRevID.data, date);
  };

  const onClickSubmitReview = async (revID, date) => {
    const studentNo = parseInt(getNo());
    // Collect all values
    try {
      const response = await instance.post(
        `/tutorreview/newpost`,
        {
          revID,
          rating,
          title,
          date,
          desc,
          stuNo: studentNo,
          tutorNo
        }
      );

      //navigate("/home");
      if (response) { //change to (if response = 200) or something later
        navigate("/home");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="App background">
      <h1 className="title">Add Review</h1>
    
      <div>
        <label for="tutorNo" className="text-input-title-text">Tutor No: </label>
        <input type="text" min="0000" max="9999" id="tutorNo" value={tutorNo} onChange={onChangeTutorNo} className="text-input"></input>
      </div>
      <br></br>

      <div>
        <label for="title" className="text-input-title-text">Review Title: </label>
        <input type="text" id="title" value={title} onChange={onChangeTitle} className="text-input"></input>

        <label for="rating" className="text-input-title-text">&emsp;Rating for tutor: </label>
        <select name="rating" id="rating" value={rating} onChange={onChangeRating}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <br></br>

      <label for="desc" className="text-input-title-text">Review for Tutor:</label>
      <textarea name="desc" id="desc" value={desc} onChange={onChangeDesc} rows="5" cols="50">
        Review description.
      </textarea>
      <br></br>
      <div>
        <button onClick={getNewData} className="button">Submit Review</button>
      </div>
    </div>
  );
}

export default AddReviewPage;
