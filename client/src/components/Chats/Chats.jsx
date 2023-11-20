import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { onSnapshot, collection, or, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { SearchOutlined } from '@ant-design/icons';

import { db } from '../../firebase';
import { convertTimeStamp, convertToTimeAgo } from '../../utils/timeUtil';
import './chat.scss';
const Chats = () => {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch, data } = useContext(ChatContext);

    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const [isFocus,setIsFocus]=useState(false);

    const handleSearch = async () => {
        const q = query(collection(db, 'users'), where('displayName', '>=', username), where('displayName', '<', username + '\uf8ff'));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
                console.log(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch();
    };
    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            console.log('idc', combinedId);
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
            handleSelectChat(user)
        } catch (err) {}

        setUser(null);
        setUsername('');
    };
    const [isChildFocused, setChildFocused] = useState(false);
    const handleChildFocus = () => {
      setChildFocused(true);
  };


   
  

  const handleChildBlur = () => {
      setChildFocused(false);
  };

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
                console.log('chats', doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelectChat = (u) => {
        console.log('chat id', u);
        dispatch({ type: 'CHANGE_USER', payload: u });
    };

    return (
        <>
            <div className='search'>
                <div className='search-input'>
                    <SearchOutlined style={{ fontSize: 18 }} />
                    <input   onBlur={handleChildBlur}  onFocus={handleChildFocus} type='text' placeholder='Find a user' onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} />
                </div>
                {err && <span>User not found!</span>}

                <div>
                    <div className='search-list'></div>
                </div>
                {user && (
                    <div className='userChat' onClick={handleSelect}>
                        <img src={user.photoURL} alt='' />
                        <div className='userChatInfo'>
                            <span>{user.displayName}</span>
                        </div>
                    </div>
                )}
            </div>
          {
            isChildFocused ?"":   <div className='chats'>
            {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                    <div
                        className={`userChat ${data?.user?.uid === chat[1].userInfo?.uid ? 'active-user' : ''} ${chat[1]?.isRead === 0 ? 'unread' : ''}`}
                        key={chat[0]}
                        onClick={() => handleSelectChat(chat[1].userInfo)}
                    >
                        <img src={chat[1].userInfo?.photoURL} alt='' />
                        <div className='userChatInfo'>
                            <span>{chat[1].userInfo?.displayName}</span>
                            <div className='message-info'>
                                <p>{chat[1].lastMessage?.text}・</p>
                                <div className='timestamp'>{convertToTimeAgo(convertTimeStamp(chat[1].date))} </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
          }
        </>
    );
};

export default Chats;
