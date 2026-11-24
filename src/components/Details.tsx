
import React, { useState, useEffect } from 'react';
import type { UserDetails, UserShort } from '../types';

interface DetailsProps {
  info: UserShort | null;
}

export const Details: React.FC<DetailsProps> = ({ info }) => {
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  console.log(details)
  useEffect(() => {
    if (!info) {
      setDetails(null);
      setError(null);
      return;
    }

    if (details && details.id === info.id) {
      return;
    }

    const loadUserDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
        );

        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data: UserDetails = await response.json();
        setDetails(data);
      } catch (err: any) {
        setError(err.message || 'Не удалось загрузить данные пользователя');
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, [info]);

  if (!info) {
    return (
      <div className="details-container">
        <div className="status-message">Выберите пользователя из списка</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="details-container">
        <div className="status-message">Загрузка данных пользователя...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <div className="error-message">Ошибка: {error}</div>
      </div>
    );
  }

  if (!details) {
    return null; 
  }
  
  return (
    <div className="details-container">
      <div className="details-content">
        <img 
            src={details.avatar} 
            alt={details.name} 
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <h2>{details.name}</h2>
        <hr />
        <p>
          <strong>City: </strong>{details.details.city}
        </p>
        <p>
          <strong>Company: </strong>{details.details.company}
        </p>
        <p>
          <strong>Company: </strong>{details.details.position}
        </p>
      </div>
    </div>
  );
};