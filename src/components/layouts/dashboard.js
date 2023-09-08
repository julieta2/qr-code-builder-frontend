import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";

const {Header, Content, Footer, Sider} = Layout;

export default ({children}) => {
  const [collapsed, setCollapsed] = useState(false);

  const {logout} = useContext(AuthContext);

  return (
    <Layout style={{height: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Link to="/list">List</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/create">Create</Link>
          </Menu.Item>
          <Menu.Item key="3" onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: "#fff"}}/>
        <Content style={{padding: '16px'}}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
