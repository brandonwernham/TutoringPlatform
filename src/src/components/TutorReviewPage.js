import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

function TutorReviewPage() {

  return (
    <div className="App background">
      <h1 className="title">Reviews</h1>
      <Link to="/addreview">
      <button className="button">Add Review</button>
      </Link>
      <br></br>
      <Link to="/viewreviews">
        <button className="button">View Reviews</button>
      </Link>
      <br/>
      <Link to="/home">
        <button className="button">Go Home</button>
      </Link>
      
    </div>
  );
}

export default TutorReviewPage;
