import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGJlODc0YTQ0NzgyZTliNTU1YTAyYTlhYjAwNzllZSIsIm5iZiI6MTc1MDI1NTM3MC45NTgwMDAyLCJzdWIiOiI2ODUyYzcwYWQ2NTYzYzg5MzM1ODM0ZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1_exqe_RH38R2syX6RY4GkPJa7pFrTja-qfeBKoeBO4'
    }
  }

  useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      if (res.results && res.results.length > 0) {
        const officialTrailer = res.results.find(
          (vid) =>
            vid.type === "Trailer" &&
            vid.site === "YouTube" &&
            vid.official === true
        );
        setApiData(officialTrailer || res.results[0]);
      }
    })
    .catch(err => console.error(err));
}, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" onClick={() => {navigate('/')}}/>
      <iframe
        width='90%'
        height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer'
        frameBorder='0'
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
