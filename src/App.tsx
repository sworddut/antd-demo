import React, { useState,  useRef } from 'react';
import { Layout, Menu, Breadcrumb, Spin, theme } from 'antd';
import { PieChartOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons';
import './App.css';
import Dashboard from './components/Dashboard';
import User from './components/User';
import Team from './components/Team';
import Files from './components/Files';
import { Footer, Header } from 'antd/es/layout/layout';
import network from "./network/network";

const { Sider, Content } = Layout;

type MenuItem = {
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

type UserData = {
  id: string;
  name: string;
  age: number;
};

type TeamData = {
  id: string;
  name: string;
  teammates: string[];
};

const menuItems: MenuItem[] = [
  { label: 'Dashboard', key: 'dashboard', icon: <PieChartOutlined /> },
  { label: 'Files', key: 'files', icon: <FileOutlined /> },
];

const App: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('dashboard');
  const [users, setUsers] = useState<UserData[]>([]);
  const [teams, setTeams] = useState<TeamData[]>([]);
  let subMenuClick = useRef(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUserOrTeam, setSelectedUserOrTeam] = useState<UserData | TeamData | null>(null);

  // 动态加载用户数据
  const fetchUsers = async () => {
    setLoading(true);
    try {
      subMenuClick.current^=1;
      if(subMenuClick.current) {
        const response = await fetch(network.fetchUserUrl);
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
    setLoading(false);
  };

  // 动态加载团队数据
  const fetchTeams = async () => {
    setLoading(true);
    try {
      subMenuClick.current^=1;
      if(subMenuClick.current) {
        const response = await fetch(network.fetchTeamUrl);
        const data = await response.json();
        setTeams(data);
      }
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    }
    setLoading(false);
  };

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);  
    if(menuItems.map(_=>_.key).includes(e.key)){
      setSelectedUserOrTeam(null); // 清除之前的详细信息  
    } 
  };

  const handleSubItemClick = (key: string, type: 'user' | 'team') => {
    if (type === 'user') {
      const selectedUser = users.find((user) => `user-${user.id}` === key);
      setSelectedUserOrTeam(selectedUser || null);
      
    } else if (type === 'team') {
      const selectedTeam = teams.find((team) => `team-${team.id}` === key);
      setSelectedUserOrTeam(selectedTeam || null);
    }
  };

  // 渲染用户子菜单项
  const renderUserSubMenuItems = () => {
    return users.map((user) => ({
      key: `user-${user.id}`,
      label: user.name,
    }));
  };

  // 渲染团队子菜单项
  const renderTeamSubMenuItems = () => {
    return teams.map((team) => ({
      key: `team-${team.id}`,
      label: team.name,
    }));
  };

  // 动态渲染内容组件
  const renderContent = () => {
    if (loading) {
      return <Spin />;
    }
    
    if (selectedUserOrTeam) {
      if ('age' in selectedUserOrTeam) {
        return <User info={selectedUserOrTeam as UserData} />;
      } else if ('teammates' in selectedUserOrTeam) {
        return <Team info={selectedUserOrTeam as TeamData} />;
      }
    }

    switch (selectedKey) {
      case 'dashboard':
        return <Dashboard />;
      case 'files':
        return <Files />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
          <Menu.SubMenu key="user" title="User" icon={<UserOutlined />} onTitleClick={fetchUsers}>
            {renderUserSubMenuItems().map((item) => (
              <Menu.Item key={item.key} onClick={() => handleSubItemClick(item.key, 'user')}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu.SubMenu key="team" title="Team" icon={<TeamOutlined />} onTitleClick={fetchTeams}>
            {renderTeamSubMenuItems().map((item) => (
              <Menu.Item key={item.key} onClick={() => handleSubItemClick(item.key, 'team')}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
      <Header style={{ backgroundColor: '#ccc', color: '#fff', textAlign: 'center',paddingInline: 48,height:64,lineHeight: '64px',fontSize:20 }}>管理后台系统</Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{selectedKey.charAt(0).toUpperCase() + selectedKey.slice(1)}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360 }}>{renderContent()}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
