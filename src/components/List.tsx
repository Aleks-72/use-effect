// src/components/List.tsx
import React from 'react';
import type { UserShort } from '../types';

interface ListProps {
  users: UserShort[];
  selectedUserId: number | null;
  onSelectUser: (user: UserShort) => void;
  isLoading: boolean;
  error: string | null;
}

export const List: React.FC<ListProps> = ({
  users,
  selectedUserId,
  onSelectUser,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <div className="status-message">Загрузка списка пользователей...</div>;
  }

  if (error) {
    return <div className="error-message">Ошибка загрузки списка: {error}</div>;
  }

  if (users.length === 0) {
    return <div className="status-message">Список пользователей пуст.</div>;
  }

  return (
    <div className="list-container">
      <h2>Пользователи</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li
            key={user.id}
            className={selectedUserId === user.id ? 'active' : ''}
            onClick={() => onSelectUser(user)}
          >
            
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};