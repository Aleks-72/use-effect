// src/components/App.tsx
import React, { useState, useEffect } from 'react';
import { List } from './components/List';
import { Details } from './components/Details';
import type { UserShort } from './types';

export const App: React.FC = () => {
  const [users, setUsers] = useState<UserShort[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserShort | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'
        );
        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }
        const data: UserShort[] = await response.json();
        setUsers(data);
      } catch (err: any) {
        setUsersError(err.message || 'Не удалось загрузить список пользователей');
      } finally {
        setIsUsersLoading(false);
      }
    };

    loadUsers();
  }, []); 

  const handleSelectUser = (user: UserShort) => {
    setSelectedUser(user);
  };

  return (
    <div className="app-container">
      <List
        users={users}
        selectedUserId={selectedUser?.id || null}
        onSelectUser={handleSelectUser}
        isLoading={isUsersLoading}
        error={usersError}
      />
      <Details info={selectedUser} />
    </div>
  );
};