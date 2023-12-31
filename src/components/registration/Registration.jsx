import React, {useState} from "react";
import "./registration.scss";
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='registration'>
            <div className="registration__header">Реєстрація</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введіть email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введіть пароль..."/>
            <button className="registration__btn" onClick={() => registration(email, password)}>Зареєструватись</button>
        </div>
    );
};


export default Registration;