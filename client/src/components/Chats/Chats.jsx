import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { convertTimeStamp, convertToTimeAgo } from "../../utils/timeUtil";
import "./chat.scss"
const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch ,data} = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        console.log("chats",doc.data())
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    console.log("chat id",data)
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className={`userChat ${data?.user?.uid===chat[1].userInfo?.uid ?"active-user":""} ${chat[1]?.isRead===0?"unread":""}`}
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}

        >
          <img src={chat[1].userInfo?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo?.displayName}</span>
            <div className="message-info">
            <p>{chat[1].lastMessage?.text}・</p>
            <div className="timestamp">{convertToTimeAgo(convertTimeStamp(chat[1].date))} </div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default Chats;
