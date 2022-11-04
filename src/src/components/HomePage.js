import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import instance from "../api/config";
import "../App.css";

import { getNo } from "../auth";

import "./HomePage.css";


export default class HomePage extends Component {
    state = {
        tutors: [],
        yoe: 0,
        selectedTutor: null,
        subjects: []
    };

    componentDidMount = async () => {
        try {
            const response = await instance.get(`/tutors`); //params contains values related to the get query being performed
            this.setState({tutors: response.data});
        } catch(err) {
            console.log(err);
        }

        try {
            const response2 = await instance.get(`/subjects`); //params contains values related to the get query being performed
            this.setState({subjects: response2.data});
        } catch(err) {
            console.log(err);
        }
    }

    searchTutors = async (e) => {
        e.preventDefault();
        console.log(e.target.elements.subj.value);
        let yoe = e.target.elements.yoe.value || 0;
        let subject = e.target.elements.subj.value;

        try {
            const response = await instance.get(`/tutors`, {params: {subj: subject, yoe: yoe}}); //params contains values related to the get query being performed
            console.log(response.data);
            this.setState({tutors: response.data, yoe: yoe});
        } catch(err) {
            console.log(err);
        }
    }

    requestSession = async (e) => {
        e.preventDefault();
        console.log("session w/ tutor " + e.target.value);
        this.setState({selectedTutor: e.target.value});
    }

    submitSessionRequest = async (e) => {
        e.preventDefault();
        try {
            const response1 = await instance.get(`/newSessionId`);
            let newId = response1.data[0][`MAX(sessionId)`] + 1;
            const response2 = await instance.post(`/session`,
            {
                sessionId: newId,
                start: e.target.elements.start.value,
                end: e.target.elements.end.value,
                tutorNo: this.state.selectedTutor,
                subjectCode: e.target.elements.subjectcode.value,
                studentNo: getNo()
            });
            this.setState({ selectedTutor: null })
        } catch(err) {
            if (err) {
                console.log(err);
                this.setState({ selectedTutor: null })
            }
        }
    }

    goToQuestions = () => {
        window.location.href = '/questions';
    }
    render() {
        return (
            <div className="App background">
                <h1 className="title">Online Tutoring</h1>
                 <h2> Home Page</h2>
                 {!this.state.selectedTutor ? (
                    <div>
                        <form onSubmit={this.searchTutors}>
                            <select name="subj">
                                <option value="Any">Any Subject</option>
                                <option value="Calculus">Calculus</option>
                                <option value="Business">Business</option>
                                <option value="Algebra">Algebra</option>
                                <option value="Physics">Physics</option>
                                <option value="Biology">Biology</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="ComputerSci">Computer Science</option>
                            </select>
                            <br />
                            <div>
                                <h2 style={{ marginBottom: 30 }}> Minimum years of experience:</h2>
                                <input name="yoe" type="number" min="0" max="9" className="text-input"/>
                            </div>
                            <br></br>
                            <button type="submit" className="button">Search Tutors</button>
                        </form>

                        <div className="tutorsDisplay">
                            {
                                this.state.tutors.length === 0 ? (
                                    <div>
                                        <span>No Tutors</span>
                                    </div>
                                ) : (
                                    this.state.tutors.map((tutor) => {
                                        return <div key={tutor.tutorNo} className="tutorRow">
                                            <span className="inline">{tutor.tutorNo} - {tutor.name}</span>
                                            {tutor.subjectTitle ? (
                                                <span> - {tutor.yearsOfExperience} YoE in {tutor.subjectTitle}</span>
                                            ) : (
                                                <div />
                                            )}
                                            <button type="submit" value={tutor.tutorNo} className="smallButton" onClick={this.requestSession}>Request Session</button>
                                        </div>
                                    })
                                )
                            }
                        </div>
                    </div> ) : (
                        <div>
                            <span>Requesting Session, enter info:</span>
                            <form onSubmit={this.submitSessionRequest}>
                                <input name="start" type="text" min="0" placeholder="Start Date/Time..."/>
                                <input name="end" type="text" placeholder="End Date/Time..."/>
                                <select name="subjectcode">
                                    {this.state.subjects.map((subject) => {
                                        return <option value={subject.subjectCode} key={subject.subjectCode}>{subject.subjectCode} - {subject.subjectTitle}</option>
                                    })}
                                </select>
                                <button type="submit">Request Session</button>
                            </form>
                            <button type="submit" onClick={() => {this.setState({selectedTutor: null})}}>Go Back</button>
                        </div>
                )}
                <br/><br/><button onClick={(this.goToQuestions)} className="button">Go to Questions</button><br/>
                <Link to="/tutorreview"><button className="button">Go to Reviews</button></Link>
            </div>
        );
    }
}
