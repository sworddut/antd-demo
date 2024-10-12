import React from 'react';

type TeamProps = {
  info: {
    id: string;
    name: string;
    teammates: string[];
  };
};

const Team: React.FC<TeamProps> = ({ info }) => {
  return (
    <div>
      <h2>Team Information</h2>
      <p>ID: {info.id}</p>
      <p>Name: {info.name}</p>
      <h3>Teammates:</h3>
      <ul>
        {info.teammates.map((teammate, index) => (
          <li key={index}>{teammate}</li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
