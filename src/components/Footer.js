import React from 'react'
import "./styles/Footer.css";

function Footer() {
    return (
        <div className='main'>
            <ul>
                <li>
                    <a title='characters' href="https://rickandmortyapi.com/api/character" target="_blank" rel="noreferrer">
                        <span class="list_item">CHARACTERS:826</span>
                    </a>
                </li>
                <li>
                    <a title='locations' href="https://rickandmortyapi.com/api/location" target="_blank" rel="noreferrer">
                        <span class="list_item">LOCATIONS:126</span>
                    </a>
                </li>
                <li>
                    <a title='episodes' href="https://rickandmortyapi.com/api/episode" target="_blank" rel="noreferrer">
                        <span class="list_item">EPISODES:51</span>
                    </a>
                </li>
            </ul>
            <br/>
            <a title='serverstatus' href="https://rickandmortyapi.com/api" target="_blank" rel="noreferrer">
                        <span class="list_item">SERVER STATUS</span>
                        <span className="status-icon"></span>
                    </a>
            <br/>
            <br/>
            <span class="list_item"> ❮❯ by Alp Buğra Toker 2024</span>        
        </div>
    )
}

export default Footer
