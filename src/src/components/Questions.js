import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/config";
import "../App.css";

function Questions() {

    
    const displayQuestions = async () => {
        const response = await instance.post(`/questions`);
        let quesDiv = document.getElementById('quesDiv');
        let content =''
        content += '<h1>Online Tutoring</h1><h3>Questions</h3>'
        content += '<p>'
        for(var i =0; i<response.data.length;i++){
            content += "<b>";
            content += "Q";
            content += JSON.stringify(response.data[i].questionId);
            content += ":&nbsp;";
            content += JSON.stringify(response.data[i].title);
            content += "</b>";
            content += ":&nbsp;&nbsp;&nbsp;";
            content += JSON.stringify(response.data[i].description);
            content += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            if(i%5 ==0){
                content += '<br>' 
                content += '<br>'
            }
        }
        content += '</p>'
        content += '<br>'
        quesDiv.innerHTML = content; 
    };

    const addQuestion = () => {
        window.location.href = '/newQuestion'
    };
    return (
        <div className="App background">
        <h1 className="title">Online Tutoring</h1>
        <h3>Questions</h3>
        <button onClick={displayQuestions} style={{ marginTop: 30 }} className="button">Display Questions</button><br/><br/>
        <div id='quesDiv'></div>
        <button onClick={addQuestion} style={{ marginTop: 30 }} className="button">New Question</button><br/>
        </div>
        
    );

}

export default Questions;