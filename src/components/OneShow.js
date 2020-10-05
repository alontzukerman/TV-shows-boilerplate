import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './OneShow.css';
import likedImg from "../media/liked.png"
import notLikedImg from "../media/notLiked.png"
import axios from 'axios';

function OneShow() {
  const { id } = useParams(); //this is the selected show id

  const [status , setStatus] = useState(localStorage.getItem(id) || false);
  console.log(status);
  const [show , setShow] = useState({});

  
  useEffect(()=>{
    getTvShowById()
  },[]);
  
  async function getTvShowById() {
    const { data } = await axios.get(`https://www.episodate.com/api/show-details?q=${id}`)
    console.log(data.tvShow);
    setShow(data.tvShow);
  }
  
  function setLocalStorage() {
    localStorage.setItem(id,!status);
    setStatus(!status);
  }

  function getColorByRating(rating) {
    let color ;
    return rating >= 8 ? 'green' : 
            rating >= 6 ? 'yellow' :
            'red' ;
  }

  return (
    <div className='one-show-container'>
      <Link className='go-back-link' to='/'>
        <img
          className='go-back-img'
          alt='Go back'
          src='https://img.icons8.com/metro/52/000000/circled-left-2.png'
        />
      </Link>
      <div className="like-div" onClick={()=>setLocalStorage()}>
          <img className="interaction-img" alt={status ? 'liked' : 'not liked'} src={status ? likedImg : notLikedImg}></img>
      </div>
      <div className="one-show-img-and-title">
        <h2>{show.name}</h2>
        <img className="one-show-img" src={show.image_path}></img>
        <div className="one-show-footer">
          <div className="seasons">{show.episodes && show.episodes[0].season && `${show.episodes[show.episodes.length-1].season} seasons`}</div>
          <div className="genres">
            {
              show.genres &&
              show.genres.map((genre,i)=>{
                return <span className="genre" key={i}>{genre}</span> ;
              })
            }
          </div>
          <div className="rating">
            <span className={getColorByRating(show.rating)}>{show.rating && show.rating.substring(0,3)}</span>
          </div>
          <div className="show-status">
            <span className="status">{show.status}</span>
          </div>
        </div>
      </div>
      {
        show.name && 
        <div className="one-show-description">
          <h2>description</h2>
          {show.description}
        </div>
      }
    </div>
  );
}

export default OneShow;
