import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

// 定义 tagsMapColor，映射足球运动员的位置到颜色
const tagsMapColor: { [key: string]: string } = {
  前锋: 'red',
  后卫: 'blue',
  门将: 'green',
  中场: 'volcano',
};

// 定义 columns，使用 TableProps 类型约束列结构
const columns: TableProps<Teammateinfo>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>, // 渲染为可点击的链接
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Good At',
    key: 'tags',
    dataIndex: 'tags',
    render: (_: any, record: Teammateinfo) => {
      const tags = new Set(record.tags);
      return (
        <>
          {Array.from(tags).map((tag) => (
            <Tag color={tagsMapColor[tag]} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      );
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];


// Team 组件，展示团队信息和队友信息表格
const Team: React.FC<{ info: TeamData }> = ({ info }) => {
  console.log(info);
  return (
    <div>
      <h2>Team Information</h2>
      <p>ID: {info.id}</p>
      <p>Name: {info.name}</p>
      <h3>Teammates:</h3>
      {/* 使用 Table 组件展示队友信息 */}
      <Table
        columns={columns}
        dataSource={info.teammateinfos} // 传递队友信息作为数据源
        rowKey="name" // 设置唯一键
        pagination={false} // 关闭分页
      />
    </div>
  );
};

export default Team;
