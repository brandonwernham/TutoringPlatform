import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/config";
import "../App.css";
import { getNo } from "../auth";

function NewQuestion() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const getQuestionId = async () => {
        const response = await instance.post(`/getQuestionId`);
        addQuestion(response.data);
    };
   
    const addQuestion = async (id) => {
        const studentNo = getNo();

        try {
            const response = await instance.post(
                `/question`,
                {
                title,
                description,
                id,
                stuNo: studentNo
                }
            );
            if (response) { //change to (if response = 200) or something later
                navigate("/questions");
            }
            } catch (error) {
            alert(error);
            }
    };

    return (
    <div className="App background">
        <h1 className="title">Online Tutoring</h1>
        <h3>New Question</h3>
    <form >
        <p className="text-input-title-text">Title:</p>
        <input type="text" value={title} onChange={onChangeTitle} className="text-input"/><br/><br/><br/>
        <label for="description" className="text-input-title-text">Question:</label><br/><br/>
        <textarea id="description" name="description" value={description} rows="4" cols="50" onChange={onChangeDescription} className="text-area"></textarea> <br/><br/>
    </form> 
    <button onClick={getQuestionId} className="button">Submit</button>
    </div>
    );

}

export default NewQuestion;