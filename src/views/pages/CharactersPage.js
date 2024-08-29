import React, { useState, useEffect,useRef } from 'react';
import Character from '../../models/Character';
import CharacterCard from '../cards/CharacterCard';
import "./styles/CharactersPage.css";
import CharacterAndFirstEpisode from '../../models/CharacterAndFirstEpisode';
import Episode from '../../models/Episode';

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [debouncedNameFilter, setDebouncedNameFilter] = useState('');

  const topRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Debounce the nameFilter input to avoid unnecessary requests "IMPORTANT"
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setDebouncedNameFilter(nameFilter);
    }, 1000); // 1 second debounce
  }, [nameFilter]);

  useEffect(() => {
    const fetchCharacters = async (page) => {
      try {
        let url = `https://rickandmortyapi.com/api/character?page=${page}`;
        const filters = [];
        if (debouncedNameFilter) filters.push(`name=${debouncedNameFilter}`);
        if (statusFilter) filters.push(`status=${statusFilter}`);
        if (genderFilter) filters.push(`gender=${genderFilter}`);
        if (filters.length > 0) {
          url += `&${filters.join('&')}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const charactersWithFirstEpisode = await Promise.all(data.results.map(async (char) => {
          const firstEpisodeUrl = char.episode[0];
          const episodeResponse = await fetch(firstEpisodeUrl);
          const firstEpisode = await episodeResponse.json();
          const episode = new Episode(firstEpisode);
          const character = new Character(
            char.id,
            char.name,
            char.status,
            char.species,
            char.gender,
            char.origin,
            char.location,
            char.image,
            char.episode,
            char.url
          );
          return new CharacterAndFirstEpisode(character, episode);
        }));

        setCharacters(charactersWithFirstEpisode);
        setTotalPages(data.info.pages);

      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters(currentPage);
  }, [currentPage, debouncedNameFilter, statusFilter, genderFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setNameFilter(value);
    if (name === 'status') setStatusFilter(value);
    if (name === 'gender') setGenderFilter(value);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleRemoveFilters = () => {
    setNameFilter('');
    setStatusFilter('');
    setGenderFilter('');
    setDebouncedNameFilter('');
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="app">
      <div ref={topRef}></div>
      <h1>Rick and Morty Characters</h1>
      <div className="filters">
        <form onSubmit={handleFilterSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Filter by name"
            value={nameFilter}
            onChange={handleFilterChange}
          />
          <select
            name="status"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
            name="gender"
            value={genderFilter}
            onChange={handleFilterChange}
          >
            <option value="">All Genders</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
          <button type="button" onClick={handleRemoveFilters}>Remove All Filters</button>
        </form>
      </div>
      <div className="card-container">
        {characters.length > 0 ? (
          characters.map((character) => (
            <CharacterCard key={character.character.id} character={character.character} episode={character.episode} />
          ))
        ) : (
          <p>No characters found with the specified filters.</p>
        )}
      </div>
      <div className="pagination">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={currentPage === page + 1 ? 'active' : ''}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharactersPage;