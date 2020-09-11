import React from 'react';

const UserCard = ({ user }) => (
  <div className="user-card" data-testid={`${user.name}-card`}>
    <h3>{user.name}</h3>
    <hr />
    <ul className="user-info-list">
      <li className="user-info-item">
        <h4>Age:</h4>
        <p>{user.age}</p>
      </li>
      <li className="user-info-item">
        <h4>Gender:</h4>
        <p>{user.gender}</p>
      </li>
      <li className="user-info-item">
        <h4>Country:</h4>
        <p>{user.country}</p>
      </li>
    </ul>
  </div>
);

export default UserCard;
