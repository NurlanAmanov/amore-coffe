import { createContext, useState, useEffect } from 'react';

export const SpotifyContext = createContext();

const CLIENT_ID = '0490a0d586c243ec92a0cf60bbbac14a';
const REDIRECT_URI = 'http://localhost:5173/callback';
const SCOPES = 'user-library-read';
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

export const SpotifyProvider = ({ children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // URL-də access_token var mı?
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const accessToken = new URLSearchParams(hash.substring(1)).get('access_token');
      setToken(accessToken);
      localStorage.setItem('spotify_token', accessToken);
    } else {
      const savedToken = localStorage.getItem('spotify_token');
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, []);

  return (
    <SpotifyContext.Provider value={{ token, AUTH_URL }}>
      {children}
    </SpotifyContext.Provider>
  );
};
