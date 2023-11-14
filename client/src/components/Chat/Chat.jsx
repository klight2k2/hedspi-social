import React, { useContext } from 'react';
import Cam from '../../img/cam.png';
import Add from '../../img/add.png';
import More from '../../img/more.png';
import Messages from '../Messages';
import Input from '../Input';
import { ChatContext } from '../../context/ChatContext';
import { Avatar } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
const Chat = () => {
    const { data } = useContext(ChatContext);

    console.log('chat message', data);
    return (
        <div className='chat'>
            <div className='chat-header'>
                <div className='chatInfo'>
                    <Avatar size={48} src={data.user.photoURL}></Avatar>
                    <p>{data.user.displayName}</p>
                </div>
                <InfoCircleOutlined style={{ fontSize: 24 }} />
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;
