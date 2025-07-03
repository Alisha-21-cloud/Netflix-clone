import React, { useEffect, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGJlODc0YTQ0NzgyZTliNTU1YTAyYTlhYjAwNzllZSIsIm5iZiI6MTc1MDI1NTM3MC45NTgwMDAyLCJzdWIiOiI2ODUyYzcwYWQ2NTYzYzg5MzM1ODM0ZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1_exqe_RH38R2syX6RY4GkPJa7pFrTja-qfeBKoeBO4'
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list">
        {apiData.length === 0 ? (
          <p>Loading movies...</p>
        ) : (
          apiData.map(card => (
            card.backdrop_path && (
              <Link to ={`/player/${card.id}`}className="card" key={card.id}>
                <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
                <p>{card.original_title}</p>
              </Link>
            )
          ))
        )}
      </div>
    </div>
  )
}

export default TitleCards
