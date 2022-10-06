import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
import FieldForContent from './components/Content/FieldForContent.jsx';
import MainMenu from './components/sidebar/Menu.jsx'


// CSS
import './styles/styles.css';

const { Header, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <MainMenu />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 8,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <FieldForContent />
      </Layout>
    </Layout>
  );
};

export default App;
