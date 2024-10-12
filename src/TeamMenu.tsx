import React, { useState, useEffect } from 'react';
import { Menu, Spin } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
type Team = {
  id: string;
  name: string;
  teammates: string[];
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

interface TeamMenuProps {
  onSelectTeam: (team: Team) => void;
}

const TeamMenu: React.FC<TeamMenuProps> = ({ onSelectTeam }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamItems, setTeamItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 请求团队数据
  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:4523/m1/4761314-4414629-default/team');
        const data = await response.json();
        setTeams(data); // 设置团队数据
        const items = data.map((team: Team) => getItem(team.name, `team-${team.id}`));
        setTeamItems(items); // 更新团队菜单项
      } catch (error) {
        console.error('Failed to fetch team data:', error);
      }
      setLoading(false);
    };
    fetchTeams();
  }, []);

  return (
    <Menu
      theme="dark"
      mode="inline"
      items={[getItem('Team', 'sub2', <TeamOutlined />, teamItems)]}
      onClick={(e) => {
        const selectedTeam = teams.find((team) => `team-${team.id}` === e.key);
        if (selectedTeam) {
          onSelectTeam(selectedTeam); // 传递完整的团队对象
        }
      }}
    >
      {loading && <Spin size="small" />}
    </Menu>
  );
};

export default TeamMenu;
