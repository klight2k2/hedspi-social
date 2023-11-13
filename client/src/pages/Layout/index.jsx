import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

import { Outlet } from 'react-router-dom';

import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;
export default function AppLayout() {

  return (
    <Layout className="layout">
      <Header style={{ background: '#fff' }}>
        <Navbar></Navbar>
      </Header>
      <Content>
      <Outlet></Outlet>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
    </Layout>
  );
}
