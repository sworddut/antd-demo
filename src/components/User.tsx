import React from 'react';

type UserProps = {
  info: {
    id: string;
    name: string;
    age: number;
  };
};

const User: React.FC<UserProps> = ({ info }) => {
  return (
    <div>
      <h2>User Information</h2>
      <p>ID: {info.id}</p>
      <p>Name: {info.name}</p>
      <p>Age: {info.age}</p>
    </div>
  );
};

export default User;

