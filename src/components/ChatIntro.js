import React from "react";
import './ChatIntro.css'
import Logo from '../assets/img-saturno.png'

const ChatIntro = ({ativar2}) => {
    const handleAbrir2 = () => {
        ativar2(true);
    }
    return (
        <div className="chatintro">
            <div onClick={handleAbrir2} className="Logo">
                <img src={Logo} alt="Logo do Saturno Chat" />
            </div>
            <h1>Bem vindo ao Saturno!</h1>
            <h2>Clique no ícone para iniciar uma conversa!</h2>
        </div>
    );
}

export default ChatIntro;