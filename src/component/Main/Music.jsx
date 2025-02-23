import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ACCESS_TOKEN = 'BURAYA_TOKEN_YAZ'; // Spotify Developer Console-dan aldığınız tokeni buraya yazın

function Music() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      });

      setTracks(response.data.items || []);
    } catch (error) {
      console.error('Spotify-dan məlumat çəkmək mümkün olmadı:', error);
      setError('Spotify-dan məlumat çəkmək mümkün olmadı. Zəhmət olmasa, Spotify-a giriş edin.');
    }
  };

  return (
    <div className='my-[100px] block pt-32 text-center'>
      <h1 className="text-3xl font-bold mb-6">Spotify Musiqilərim</h1>
      {error && <p className="text-red-500">{error}</p>}
      {tracks.length > 0 ? (
        <ul className="space-y-2">
          {tracks.map((track, index) => (
            <li key={index} className="border p-3 rounded-lg shadow-sm">
              <strong>{track.track.name}</strong> - {track.track.artists.map(artist => artist.name).join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Heç bir musiqi tapılmadı.</p>
      )}
    </div>
  );
}

export default Music;
