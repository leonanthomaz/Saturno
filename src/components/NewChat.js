import React, {useState, useEffect} from "react";
import './NewChat.css'
import api from "../api";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
  
const NewChat = ({user, chatlist, show, setshow}) => {
    const [list, setList] = useState([
        
    ]);

    useEffect(()=>{
        const getlist = async () => {
            if(user !== null){
                let results = await api.getContactList(user.id);
                setList(results);
            }
        }
        getlist();
    }, [user]);

    const addNewChat = async (user2) => {
        await api.addNewChat(user, user2);

        handleClose();
    }
    
    const handleClose = () => {
        setshow(false);
    }
   

    return(
        <div className="newchat" style={{left: show? 0 : -300}}>
            <div className="newchat-head">
                <div onClick={handleClose} className="newchat-backbutton">
                <ArrowBackIcon style={{color: '#FFF'}} />
                </div>
                <div className="newchat-headtitle">Nova Conversa</div>
            </div>
            <div className="newchat-list">
                {list.map((item, key)=>(
                    <div onClick={()=>addNewChat(item)} className="newchat-item" key={key}>
                        <img className="newchat-itemavatar" src={item.avatar} alt="" />
                        <div className="newchat-itemname">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewChat;