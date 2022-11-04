import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../api/config';



function TutorSignup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");

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

    const onChangePhone = (event) => {
        setPhone(event.target.value)
    }

    const getTutorNo = async () => {
        const response = await instance.post(`/getTutorNo`);
        onClickSignUp(response.data);
    };

    const onClickSignUp = async (number) => {
        try {
            const response = await instance.post(
                `/sign-up/tutor`,
                {
                    email,
                    password,
                    name,
                    birth,
                    phone,
                    number,
                }
            );
            if (response) { //change to (if response = 200) or something later
                navigate("/");
            }
        } catch (error) {
            alert(error);
        }
    }



    return (
        <div className="App background">
            <h1 className="title">Online Tutoring</h1>
            <h2> Tutor Sign Up </h2>
            <form style={{ width: 200 }}>
                <div className="input-container">
                    <p>Email</p>
                    <input type="text" value={email} onChange={onChangeEmail} className="text-input"/>
                </div>
                <div className="input-container">
                    <p>Password</p>
                    <input type="password" value={password} onChange={onChangePasswordText} className="text-input"/>
                </div>
                <div className="input-container">
                    <p>Name</p>
                    <input type="date" value={name} onChange={onChangeName} className="text-input"/>
                </div>
                <div className="input-container">
                    <p>Birth Date</p>
                    <input type="text" value={birth} onChange={onChangeBirthDate} className="text-input"/>
                </div>
                <br /><small>Format: YYYY-MM-DD</small>
                <div className="input-container">
                    <p>Phone Number</p>
                    <input type="tel" value={phone} onChange={onChangePhone} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="text-input"/>
                </div>
                <br /><small>Format: 123-456-7890</small>
            </form>
            <button onClick={getTutorNo} style={{ marginTop: 30 }}>Sign Up</button>
        </div>
    );

}


export default TutorSignup;