import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { Menu } from 'antd';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { useState } from 'react';
import { AppstoreOutlined, BellOutlined, MessageOutlined, SearchOutlined } from '@ant-design/icons';
import { Tooltip, Avatar, Space, Button, Dropdown, Input } from 'antd';
import './navbar.scss';
import { NavLink, createSearchParams,useNavigate } from 'react-router-dom';
const text = <span>Title</span>;
const items = [
    {
        label: (
            <NavLink to="profile">
                My Profile
            </NavLink>
        ),
        key: '0',
    },
    {
        type: 'divider',
    },
    {
        label: (
            <a target='_blank' onClick={() => signOut(auth)} rel='noopener noreferrer' href='https://www.aliyun.com'>
                Logout
            </a>
        ),
        key: '1',
    },
];
const content = (
    <div>
        <Button onClick={() => signOut(auth)}>logout</Button>
        <p>Content</p>
    </div>
);

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    const [current, setCurrent] = useState('mail');
    const [searchText,setSearchText]=useState();
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const navigate = useNavigate();
    const handleSearch= ()=>{
      navigate(`home?search=${searchText}`,{ replace: true })
    }
    return (
        <div className='navbar'>
            <NavLink className='navbar-logo'  to='/home'>
                <img src='/icon/logo.svg' alt='' />
            </NavLink>

            <div className='navbar-search'>
                <Input addonAfter={<SearchOutlined onClick={handleSearch}/>} placeholder='Search some post....'
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                />
            </div>

            <ul className='navbar-list'>
                <li>
                    <Tooltip title='Post'>
                        <NavLink to='/create-post'>
                            <BiMessageSquareEdit size={24} />
                        </NavLink>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title='Messages'>
                        <NavLink to='/messenger'>
                            <MessageOutlined size={24} style={{ fontSize: '24px' }} />
                        </NavLink>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title='Notifications'>
                        <BellOutlined size={24} style={{ fontSize: '24px' }} />
                    </Tooltip>
                </li>
                <li>
                    <Dropdown
                        className='avatar'
                        placement='bottomRight'
                        menu={{
                            items,
                        }}
                    >
                        <Space>
                            <Avatar style={{ verticalAlign: 'middle' }} size='default'>
                                hello
                            </Avatar>
                            <p>Minh Quang Phạm</p>
                        </Space>
                    </Dropdown>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
