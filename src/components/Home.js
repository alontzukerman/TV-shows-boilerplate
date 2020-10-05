import React, { useEffect, useState } from 'react';
import Show from './Show';
import './Home.css';
import bg from '../video/popcorn.mp4';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Home() {
  let history = useHistory();
  const [shows, setShows] = useState([]);
  const [inputValue , setInputValue] = useState('');

  useEffect(()=>{
    getTopTvShows();
  },[]);

  async function getTopTvShows() {
    const { data } = await axios.get('https://www.episodate.com/api/most-popular');
    setShows(data.tv_shows);
  }

  async function getTvShowsBySearch(e) {
    e.preventDefault() ;
    console.log(inputValue);
    if(inputValue.length !== 0) {
      const { data } = await axios.get(`https://www.episodate.com/api/search?q=${inputValue}`);
      console.log(data);
      setShows(data.tv_shows);
    } else getTopTvShows() ;
  }

  return (
    <div className='app'>
      <video src={bg} playsInline autoPlay muted loop id='bgvid' />
      {/* If you want to know how to implement video as your background 
      you can take a look here: https://www.w3schools.com/howto/howto_css_fullscreen_video.asp */}
      <h1>The Best T.V Shows</h1>

      <form id="form1" method="get">
        <input id="search-bar" onChange={(e)=>setInputValue(e.target.value)}></input>
        <button id="submit-btn" type='submit' onClick={(e)=>getTvShowsBySearch(e)}>Search</button>
      </form>      
      
     
      <div className="top-shows">
      {shows.map((show) => (
        <Show show={show} key={show.id} />
      ))}
      </div>
    </div>
  );
}

export default Home;
