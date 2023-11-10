import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Post from '../../components/Post/Post';

import AddPost from '../../components/AddPost/AddPost';
import { Outlet } from 'react-router-dom';
import './home.scss';

import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;
export default function Home() {
  return (
    <Layout className="layout">
      <Header style={{ background: '#fff' }}>
        <Navbar></Navbar>
      </Header>
      <Content style={{ padding: '0 50px' }}>
      <Outlet />
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
    </Layout>
  );
}
