import React, {useState, useEffect, useRef} from "react";
import EmojiPicker from 'emoji-picker-react'
import './ChatWindow.css'
import MessageItem from './MessageItem';
import api from "../api";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import ChatIcon from '@material-ui/icons/Chat';

const ChatWindow = ({user, data, ativar}) => {

    const body = useRef();
    let recognation = null;
    let SpeechRecognation = window.SpeechRecognation || window.webkitSpeechRecognation;
    if(SpeechRecognation !== undefined){
        recognation = new SpeechRecognation();
    }
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState ('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        setList([]);
        let unsub = api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
        
    }, [data.chatId]);

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list]);

    const handleEmojiClick = (e, emojiObject) => {
       setText(text + emojiObject.emoji);
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleMicClick = () => {
        if(recognation !== null){
            recognation.onstart = () => {
                setListening(true);
            }
            recognation.onend = () => {
                setListening(false);
            }
            recognation.onresult = (e) => {
                setText(e.results[0][0].transcript);
            }
            recognation.start();
        }
    }
    const handleInputKeyUp = (e) => {
        if(e.keyCode == 13){
            handleSendClick();
        }
    }

    const handleSendClick = () => {
        if(text !== ''){
            api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }

    const handleAbrir = () => {
        ativar(true);
    }
    return (
        <div className="chatwindow">
            <div className="chatwindow-header">
                <div className="chatwindow-header-info">
                    <img className="chatwindow-avatar" src={data.image} alt="" />
                    <div className="chatwindow-name">{data.title}</div>
                </div>

                <div className="chatwindow-headerbuttons">  
                    <div className="chatwindow-btn">
                        <AttachFileIcon style={{color: '#fff'}} />
                    </div>
                    <div onClick={handleAbrir} className="chatwindow-btn">
                        <ChatIcon style={{color: '#fff'}} />
                    </div>
                </div>
            </div>
            <div ref={body} className="chatwindow-body">
                {list.map((item, key)=>(
                    <MessageItem
                    key={key}
                    data={item}
                    user={user}
                    />
                ))}
            </div>
            <div className="chatwindow-emojiarea" style={{height: emojiOpen ? '200px' : '0px'}}>
                <EmojiPicker 
                onEmojiClick={handleEmojiClick}
                disableSearchBar
                disableSkinTonePicker
                />
            </div>
            <div className="chatwindow-footer">
                <div className="chatwindow-pre">
                    <div className="chatwindow-btn"
                    onClick={handleCloseEmoji}
                    style={{width: emojiOpen?40:0}}
                    >
                        <CloseIcon style={{color: '#fff'}} />
                    </div>
                    <div className="chatwindow-btn"
                    onClick={handleOpenEmoji}                   
                    >
                        <EmojiEmotionsIcon style={{color: emojiOpen?'#009688' : '#fff'}} />
                    </div>
                </div>
                <div className="chatwindow-inputarea">
                    <input 
                    className="chatwindow-input" 
                    type="text" 
                    placeholder="Digite uma mensagem"
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    onKeyUp={handleInputKeyUp}
                    />
                </div>
                <div className="chatwindow-pos">
                    {text === '' &&
                    <div onClick={handleMicClick} className="chatwindow-btn">
                        <MicIcon style={{color: listening ? '#126ECE':'#fff'}} />
                    </div>
                    }
                    {text !== '' &&
                    <div onClick={handleSendClick} className="chatwindow-btn">
                        <SendIcon style={{color: '#919191'}} />
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;