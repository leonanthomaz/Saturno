import React, {useState, useEffect} from 'react';
import './App.css';
import ChatIntro from './components/ChatIntro';
import ChatListItem from './components/ChatListItem';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import api from './api';

export default () => {

  const [chatlist, setChatList] = useState([]);

  //identificando Chat ativo
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(()=>{
    if(user !== null){
     let unsub = api.onChatList(user.id, setChatList);
     return unsub;
    }
  })

  const handleNewChat = () => {
    setShowNewChat(true);
  }

  const [Open, setOpen] = useState(false);

  const handleFechar = () => {
    setOpen(false);
  }

  const handleLoginData = async (u) => {
      let newUser = {
        id: u.uid,
        name: u.displayName,
        avatar: u.photoURL
      };
      await api.addUser(newUser);

      setUser(newUser);
  }

  if(user === null){
    return(<Login onReceive={handleLoginData} />);
  }

  return (
    <div className="App">
      <div className="app-window">
        <div className="sidebar" style={{left: Open? 0 : -300}}> 
        <NewChat 
          chatlist = {chatlist}
          user={user}
          show={showNewChat}
          setshow={setShowNewChat}
        />    

        <header>
            <img className="header-avatar" src={user.avatar} alt="Foto Avatar" />
          <div className="header-buttons">
            <div onClick={handleNewChat} className="header-btn">
              <ChatIcon style={{color:'#fff'}} />
            </div>
            <div onClick={handleFechar} className="header-btn">
              <CloseIcon style={{color:'#fff'}} />
            </div>
          </div>
        </header>
        
        <div className="search">
          <div className="search-input">
            <SearchIcon fontSize="small" style={{color:'#fff'}} />
            <input type="search" placeholder="Procurar conversa..."></input>
          </div>
        </div>
        <div className="chatlist">
          {chatlist.map((item, key)=>(
            <ChatListItem 
            key={key}
            data={item}
            active={activeChat.chatId === chatlist[key].chatId}
            onclick={()=>setActiveChat(chatlist[key])}
            />
          ))}
        </div>
        </div>
            <div className="contentarea">
              {activeChat.chatId === undefined &&
              <ChatIntro 
              ativar2={setOpen}
              />
              }
              {activeChat.chatId !== undefined &&
                <ChatWindow
                user={user}
                data={activeChat}
                ativar={setOpen}
                />
              }
            </div>
        </div>
      </div>
  );
}

