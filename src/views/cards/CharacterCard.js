import React from 'react';

const Card = ({ character, episode }) => {
    return (
        <div className="card">
            <img src={character.image} alt={character.name} className="character-image" />
            <div className="character-details">
                <h2 className="character-name">
                    <a href={`https://rickandmortyapi.com/api/character/${character.id}`} target="_blank" rel="noreferrer">
                        {character.name}
                    </a>
                </h2>

                <p className="character-status">
                    <span className={`status-icon ${character.status.toLowerCase()}`}></span>
                    {character.status} - {character.species}
                </p>
                <p className="character-location">
                    Last known location: <br />
                    <a href={character.location.url} target="_blank" rel="noreferrer">
                        <span>{character.location.name}</span>
                    </a >

                </p>
                <p className="character-first-seen">
                    First seen in :<br />
                    <a href={episode.url} target="_blank" rel="noreferrer">
                        <span>{episode.name}</span>
                    </a>
                </p>

            </div>
        </div>
    );
};

export default Card;
