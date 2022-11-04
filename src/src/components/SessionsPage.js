import { useState } from 'react';
import { Link } from 'react-router-dom';
import instance from "../api/config";
import '../App.css';

function SessionsPage() {
    //const newConnection = require('./config');

    //let conn = newConnection();
    //conn.connect();

    /*conn.query(`SELECT tutorplatform.session.sessionId,tutorplatform.tutor.name,tutorplatform.student.name,tutorplatform.subject.subjectTitle
                FROM tutorplatform.session
                INNER JOIN tutorplatform.tutor
                ON tutorplatform.tutor.tutorNo = tutorplatform.session.tutorNo
                INNER JOIN tutorplatform.student
                ON tutorplatform.student.studentNo = tutorplatform.session.studentNo
                INNER JOIN tutorplatform.subject
                ON tutorplatform.subject.subjectCode = tutorplatform.session.subjectCode
                GROUP BY tutorplatform.session.sessionId;`, (err, rows, fields) => {
        if (err) {
          console.error(err);
        }
    
        res.json(rows);
    });
    
    conn.end();
*/

//    const newConnection = require('../../server/config');

    const displaySessions = () => {
        window.location.href = '/viewSessions'
/*        let conn = newConnection();
        conn.connect();

        conn.query('SELECT tutorplatform.session.sessionId FROM tutorplatform.session;', (err, rows, fields) => {
            if (err) {
              console.error(err);
            }
        
            res.json(rows);
        });

        conn.end();*/
    };

    const addSession = () => {
        window.location.href = '/newSession';
    };

    return (
        <div className="App background">
            <button onClick={addSession} style={{ marginTop: 30 }} className="button">New Session</button><br/>
            <button onClick={displaySessions} style={{ marginTop: 30 }} className="button">Display Sessions</button><br/>
        </div>
    );
}

export default SessionsPage;
