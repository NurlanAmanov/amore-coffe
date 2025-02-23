import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ACCESS_TOKEN = 'BQDOZp7XNE5_J1zm39C325Xkvqfi2lzIRuARoIm_JDEfFbP8ezFcrg5-ves5RwCC0BZhynRB5OVhsqiLuZPeRUgQylY63ZxDZgcAQmoM1UAX3mTe5D0fmf-K2xohrsdaKESM-haKRzbjBQk0QlribVwuTA1ljvto1maEipnznCo1sIiXAgYj97jqvg0yc6uzQVgacjMnbi8euxrJ4m_ohbkBDrttgikNxB22hu2zX5D3S44gXuHUJqFPxbtn9nIu'; // Replace with your valid access token

function Music() {
  const [tracks, setTracks] = useState([]);
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);

  // Fetch top tracks on component mount
  useEffect(() => {
    fetchTopTracks();
  }, []);

  // Initialize the Spotify Web Playback SDK
  useEffect(() => {
    if (window.Spotify) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const playerInstance = new Spotify.Player({
          name: 'Web Playback Player',
          getOAuthToken: (cb) => { cb(ACCESS_TOKEN); },
          volume: 0.5,
        });

        playerInstance.connect();

        playerInstance.on('ready', ({ device_id }) => {
          console.log('The Web Playback SDK is ready with device ID:', device_id);
          setPlayer(playerInstance);
        });

        playerInstance.on('player_state_changed', (state) => {
          console.log(state);
          if (state && state.track_window) {
            setCurrentTrack(state.track_window.current_track);
          }
        });

        playerInstance.on('initialization_error', ({ message }) => {
          console.error(message);
        });

        playerInstance.on('authentication_error', ({ message }) => {
          console.error(message);
        });

        playerInstance.on('account_error', ({ message }) => {
          console.error(message);
        });

        playerInstance.on('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline:', device_id);
        });
      };
    } else {
      console.error("Spotify Web Playback SDK could not be loaded.");
    }
  }, []);

  const fetchTopTracks = async () => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5', {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
      });
      setTracks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching tracks from Spotify:', error);
      setError('Failed to fetch tracks from Spotify. Please check your login status.');
    }
  };

  const togglePlay = () => {
    if (player) {
      player.togglePlay();
    } else {
      console.log('Player is not ready yet.');
    }
  };

  return (
    <div className="my-[100px] block pt-32 text-center">
      <h1 className="text-3xl font-bold mb-6">Spotify Musics</h1>
      {error && <p className="text-red-500">{error}</p>}

      {tracks.length > 0 ? (
        <ul className="space-y-2">
          {tracks.map((track, index) => (
            <li key={index} className="border p-3 rounded-lg shadow-sm">
              <strong>{track.name}</strong> - {track.artists.map(artist => artist.name).join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tracks found.</p>
      )}

      <button onClick={togglePlay} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Toggle Play
      </button>

      {currentTrack && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Currently Playing:</h2>
          <p>{currentTrack.name} by {currentTrack.artists.map(artist => artist.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default Music;
