import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Filter = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await Axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: 'b57105a0c50dd127574bb0c27c407459',
          },
        });
         console.log(response);   
        const { data: { genres } } = response;
        setGenres(genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <label htmlFor="genre">Select Genre:</label>
      <select id="genre" onChange={(e) => onSelectGenre(e.target.value)}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;