import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'
import { Menu } from 'antd';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { useState } from 'react';
import { AppstoreOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import {Tooltip,Avatar,Space,Button,Dropdown } from 'antd'
import './navbar.scss'
const text = <span>Title</span>;
const items = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
         My Profile
        </a>
      ),
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <a target="_blank" onClick={()=>signOut(auth)} rel="noopener noreferrer" href="https://www.aliyun.com">
         Logout
        </a>
      ),
      key: '1',
    },
    
  ];
const content = (
  <div>
     <Button onClick={()=>signOut(auth)}>logout</Button>
    <p>Content</p>
  </div>
);



const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className='navbar'>
    <div className="navbar-logo">
        <img src="/icon/logo.svg" alt="" />
    </div>

  <ul className='navbar-list'>
    <li>
    <Tooltip title="Post">
    <BiMessageSquareEdit size={24} style={{color:'red'}}/>
  </Tooltip>
    </li>
    <li>
    <Tooltip title="Messages">
    <MessageOutlined  size={24} style={{color:'red',fontSize:'24px'}} />
  </Tooltip>
  
    </li>
    <li>
    <Tooltip title="Notifications">
    <BellOutlined  size={24} style={{color:'red',fontSize:'24px'}} />
  </Tooltip>

    </li>
    <li>
    <Dropdown className='avatar' placement="bottomRight"  menu={{
      items,
    }}>
          <Space>

    <Avatar style={{ backgroundColor: 'red', verticalAlign: 'middle' }} size="default">
        hello
      </Avatar>
      <p>Minh Quang Phạm</p>
      </Space>

        </Dropdown>

    </li>
  </ul>
    </div>
  )
}

export default Navbar