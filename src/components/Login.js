import React from 'react';
import api from '../api';
import './Login.css';
import Logo from '../assets/saturno-chat.png';

const Login = ({onReceive}) => {

    const handleGoogleLogin = async () => {
        let result = await api.googlepopup();
        if(result){
            onReceive(result.user);
        }else{
            alert("Erro!")
        }
    }

    return (
        <div className="Login">
            <div className="Logo">
            <img src={Logo} />
            </div>
            <button onClick={handleGoogleLogin}>Logar com Google</button>
        </div>
    );
}

export default Login;
