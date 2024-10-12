import React, { useState, useEffect } from 'react';
import { Menu, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
type User = {
  id: string;
  name: string;
  age: number;
};

// 创建菜单项的工具函数
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

interface UserMenuProps {
  onSelectUser: (user: User) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userItems, setUserItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 请求用户数据
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:4523/m1/4761314-4414629-default/user');
        const data = await response.json();
        setUsers(data); // 设置用户数据
        const items = data.map((user: User) => getItem(user.name, `user-${user.id}`));
        setUserItems(items); // 更新用户菜单项
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <Menu
      theme="dark"
      mode="inline"
      items={[getItem('User', 'sub1', <UserOutlined />, userItems)]}
      onClick={(e) => {
        const selectedUser = users.find((user) => `user-${user.id}` === e.key);
        if (selectedUser) {
          onSelectUser(selectedUser); // 传递完整的用户对象
        }
      }}
    >
      {loading && <Spin size="small" />}
    </Menu>
  );
};

export default UserMenu;
