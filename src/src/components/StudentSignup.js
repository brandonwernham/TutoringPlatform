import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/config";
import "../App.css";



function StudentSignup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirthDate] = useState("");
    const [year, setCurrentYear] = useState("");
    const [school, setSchool] = useState("");

    const navigate = useNavigate();

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePasswordText = (event) => {
        setPassword(event.target.value)
    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeBirthDate = (event) => {
        setBirthDate(event.target.value)
    }

    const onChangeSchool = (event) => {
        setSchool(event.target.value)
    }

    const getStudentNo = async () => {
        const response = await instance.post(`/getStudentNo`);
        onClickSignUpStudent(response.data);
    };

    const onClickSignUpStudent = async (number) => {
        try {
            const response = await instance.post(
                `/sign-up/student`,
                {
                    email,
                    password,
                    name,
                    birth,
                    year,
                    school,
                    number,
                }
            );
            //navigate("/home");
            if (response) { //change to (if response = 200) or something later
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    const onClickRadio = (event) => {
        if (event.target.value == "1st") {
            setCurrentYear("1st Year")
        }
        if (event.target.value == "2nd") {
            setCurrentYear("2nd Year")
        }
        if (event.target.value == "3rd") {
            setCurrentYear("3rd Year")
        }
        if (event.target.value == "4th") {
            setCurrentYear("4th Year")
        }
        if (event.target.value == "5th") {
            setCurrentYear("5th Year")
        }
    };



    return (
        <div className="App background">
            <h1>Online Tutoring</h1>
            <h3> Student Sign Up </h3>
            <form style={{ width: 200 }}>
                <div className="input-container">
                    <p className="text-input-title-text">Email</p>
                    <input className="text-input" type="text" value={email} onChange={onChangeEmail} />
                </div>
                <div className="input-container">
                    <p className="text-input-title-text">Password</p>
                    <input className="text-input" type="password" value={password} onChange={onChangePasswordText} />
                </div>
                <div className="input-container">
                    <p className="text-input-title-text">Name</p>
                    <input className="text-input" type="text" value={name} onChange={onChangeName} />
                </div>
                <div className="input-container">
                    <p className="text-input-title-text">Birth Date</p>
                    <input className="text-input" type="date" value={birth} onChange={onChangeBirthDate} />
                </div>
                <div className="input-container">
                    <p className="text-input-title-text">School</p>
                    <input className="text-input" type="text" value={school} onChange={onChangeSchool} />
                </div>
                <div className="input-container">
                    <p className="text-input-title-text">Current Year</p>
                    <form>
                        <input type="radio" id="1st" value="1st" name="Birth" onClick={onClickRadio} />
                        <label for="1st" style={{ marginRight: 20 }}> 1st </label>
                        <input type="radio" id="2nd" value="2nd" name="Birth" onClick={onClickRadio} />
                        <label for="2nd" style={{ marginRight: 20 }}> 2nd </label>
                        <input type="radio" id="3rd" value="3rd" name="Birth" onClick={onClickRadio} />
                        <label for="3rd" style={{ marginRight: 20 }}> 3rd </label>
                        <input type="radio" id="4th" value="4th" name="Birth" onClick={onClickRadio} />
                        <label for="4th" style={{ marginRight: 20 }}> 4th </label>
                        <input type="radio" id="5th" value="5th" name="Birth" onClick={onClickRadio} />
                        <label for="5th" style={{ marginRight: 20 }}> 5th </label>
                    </form>
                </div>

            </form>
            <button className="button" onClick={getStudentNo} style={{ marginTop: 30 }}>Sign Up</button>
        </div>
    );

}


export default StudentSignup;
