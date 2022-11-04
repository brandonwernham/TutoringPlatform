const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const newConnection = require('./config');
const { connect } = require('http2');

const app = express();
const port = 80;

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  // Test DB connection
  let conn = newConnection();
  conn.connect();

  conn.query('SELECT * FROM Tutor', (err, rows, fields) => {
    if (err) {
      console.error(err);
    }

    res.json(rows);
  });

  conn.end();
})

// Check email and password credentials and sign in
app.post('/sign-in/student', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const email = req.body.email;
  const password = req.body.password;

  // Get student with matching email and password
  conn.query('SELECT * FROM Student WHERE emailAddress = ? AND password = ?',
    [email, password],
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }

      if (rows.length == 0) {
        res.status(400);
      }
      res.json(rows);
    });

  conn.end();
});

app.post('/sign-in/tutor', (req, res) => {
  let conn = newConnection();
  conn.connect();

  const email = req.body.email;
  const password = req.body.password;

  // Get tutor with matching email and password
  conn.query('SELECT * FROM Tutor WHERE emailAddress = ? AND password = ?',
    [email, password],
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }

      if (rows.length == 0) {
        res.status(400);
      }
      
      res.json(rows);
    });

  conn.end();
});

// Get new studentNo
app.post('/getStudentNo', (req, res) => {
  let conn = newConnection();
  conn.connect();

  conn.query('SELECT * FROM Student WHERE studentNo = ( SELECT MAX(studentNo) FROM Student) ;',
    (err, rows, fields) => {
      res.json(rows[0].studentNo + 1);
    });

    conn.end();
  });

// Get new tutorNo
app.post('/getTutorNo', (req, res) => {
  let conn = newConnection();
conn.connect();

conn.query('SELECT * FROM Tutor WHERE tutorNo = ( SELECT MAX(tutorNo) FROM Tutor) ;',
  (err, rows, fields) => {
    res.json(rows[0].tutorNo + 1);
  });

  conn.end();
  });

// Get new reviewID
app.post('/getReviewID', (req, res) => {
  let conn = newConnection();
  conn.connect();

  conn.query('SELECT * FROM Review WHERE reviewId = ( SELECT MAX(reviewId) FROM Review) ;',
    (err, rows, fields) => {
      res.json(rows[0].reviewId + 1);
    });

    conn.end();
  });

// Create a new student
app.post('/sign-up/student', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const birth = req.body.birth;
  const year = req.body.year;
  const school = req.body.school;
  const number = req.body.number;

  console.log(number);
  
  conn.query(`INSERT INTO Student (studentNo, name, dateOfBirth, school, currentYear, emailAddress, password) VALUES (${number},'${name}','${birth}','${school}','${year}','${email}','${password}')`,
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }
      else{
        res.json(rows);
      }

  });
 
  conn.end();
});

// Create a new tutor
app.post('/sign-up/tutor', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const birth = req.body.birth;
  const phone = req.body.phone;
  const number = req.body.number;

  // Get student with matching email and password
  conn.query(`INSERT INTO Tutor (tutorNo, name, dateOfBirth, emailAddress, password, phoneNumber) VALUES (${number},'${name}','${birth}','${email}','${password}','${phone}')`,
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }
      else{
        res.json(rows);
      }
    });

  conn.end();
});

// Create a new review
app.post('/tutorreview/newpost', (req, res) => {
  let conn = newConnection();
  conn.connect();

  // Receive values
  const revID = req.body.revID;
  const rating = req.body.rating;
  const title = req.body.title;
  const date = new Date().toISOString().slice(0, 10);
  const desc = req.body.desc;
  //const stuNo = req.body.stuNo;
  // MANUALLY ADDS AS '3005', NEED TO MAKE IT SO IT ADDS AS LOGGED IN
  const stuNo = req.body.stuNo;
  const tutorNo = req.body.tutorNo;

  /*
  conn.query(`SELECT * FROM Student WHERE emailAddress = ${email}`,
  (err, rows, fields) => {
    if (err) {
      console.error(err);
    }
    else{
      const stuNo=rows[0].studentNo;
    }

}); */

  // Insert the new review into the table
  conn.query(`INSERT INTO Review (reviewID, rating, title, datePosted, description, studentNo, tutorNo) VALUES (${revID},'${rating}','${title}','${date}','${desc}',${stuNo},${tutorNo})`,
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }
      else{
        res.json(rows);
      }
    });

  conn.end();
});

// List tutors with filters
app.post('/tutorreview/viewposts', (req, res) => {
  const tutorNo = req.body.tutorNo || 0;

  let conn = newConnection();
  conn.connect();

  conn.query(`SELECT * FROM Review WHERE tutorNo = ${tutorNo}`,
  (err, rows, fields) => {
    if (err) {
      console.error(err);
    }
    else{
      res.json(rows);
    }
  })
});

// List tutors with filters
app.get('/tutors', (req, res) => {
  const yoe = req.query.yoe || 0;
  let conn = newConnection();
  conn.connect();
  if (req.query.subj && req.query.subj != 'Any') {
    let subjectQuery = `'` + req.query.subj + `'`;
    conn.query(`SELECT TutorSubject.tutorNo, Tutor.name, Subject.subjectTitle, TutorSubject.yearsOfExperience 
    FROM TutorSubject INNER JOIN Tutor ON Tutor.tutorNo=TutorSubject.tutorNo 
    INNER JOIN Subject ON TutorSubject.subjectCode=Subject.subjectCode WHERE 
    TutorSubject.yearsOfExperience>=${yoe} AND Subject.subjectTitle=${subjectQuery}`, (err, rows, fields) => {
      res.send(rows);
      if (err) {
        console.log(err);
      }
    });
  } else { //grab all tutors if 
    conn.query('SELECT tutorNo, name FROM tutor', (err, rows, fields) => {
      res.send(rows);
    });
  }
  //conn.query('SELECT * FROM Tutor')
});

app.get('/subjects', (req, res) => {
  let conn = newConnection();
  conn.connect();
  conn.query('SELECT * FROM subject',
  (err, rows, fields) => {
    if (err) {
      console.error(err);
    }
    else{
      res.send(rows);
    }
  });

  conn.end();
});

// List students with filters
app.get('/students', (req, res) => {

});

// Create a session between a tutor and student
app.post('/sessions', (req, res) => {

});

// Ask a question as a student
app.post('/question', (req, res) => {
  let conn = newConnection();
  conn.connect();
  const title = req.body.title;
  const description = req.body.description;
  const id = req.body.id;
  const number = 3000;
  

  conn.query(`INSERT INTO Question (questionId, title, description, studentNo) VALUES (${id},'${title}','${description}',${number})`,
    (err, rows, fields) => {
      if (err) {
        console.error(err);
      }
      else{
        res.json(rows);
      }

  });
  
  conn.end();
});

app.post('/session', (req, res) => {
  let conn = newConnection();
  conn.connect();
  conn.query(`INSERT INTO Session (sessionId, startDateTime, endDateTime, tutorNo, subjectCode, studentNo) VALUES (${req.body.sessionId},'${req.body.start}','${req.body.end}',${req.body.tutorNo},${req.body.subjectCode},${req.body.studentNo})`,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200);
      }
  });
  conn.end();
});

app.get('/newSessionId', (req, res) => {
  let conn = newConnection();
  conn.connect();
  conn.query('SELECT MAX(sessionId) FROM Session', (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });

  conn.end();
})

app.post('/getQuestionId', (req, res) => {
  let conn = newConnection();
  conn.connect();

  conn.query('SELECT * FROM Question WHERE questionId = ( SELECT MAX(questionId) FROM Question) ;',
    (err, rows, fields) => {
      res.json(rows[0].questionId + 1);
    });

    conn.end();
});

// List all questions
app.post('/questions', (req, res) => {
  let conn = newConnection();
  conn.connect();
  conn.query('SELECT * FROM Question;',
  (err, rows, fields) => {
    if (err) {
      console.error(err);
    }
    else{
      res.json(rows);
    }
  });

});

// Answer a question as a tutor
app.post('/answers', (req, res) => {

});

// Leave a review of a tutor
app.post('/reviews', (req, res) => {

});

// See all reviews of a tutor
app.post('/reviews')

app.post('/sessionId/viewsessions', (req, res) => {
  const subjectCode = req.body.subjectCode || 0;

  let conn = newConnection();
  conn.connect();

  conn.query(`SELECT * FROM Session WHERE subjectCode = ${subjectCode}`,
  (err, rows, fields) => {
    if (err) {
      console.error(err);
    }
    else{
      res.json(rows);
    }
  })
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})
