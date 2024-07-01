import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import FavoriteEpisodes from '../components/FavoriteEpisodes';
import '../styles/seasonPage.css';

interface Season {
  id: number;
  number: number;
  episodes: Episode[];
}

interface Show {
  id: number;
  title: string;
  description: string;
  image: string;
  seasons: Season[];
}

interface SeasonPageParams {
  showId: string;
}

const SeasonPage: React.FC = () => {
  const { showId } = useParams<SeasonPageParams>();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await api.get(`/id/${showId}`);
        setShow(response.data);
      } catch (error) {
        setError('Error fetching show details.');
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [showId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!show) {
    return <div>Show not found.</div>;
  }

  return (
    <div className="season-page">
      <div className="show-header">
        <img src={show.image} alt={show.title} />
        <div className="show-info">
          <h1>{show.title}</h1>
          <p>{show.description}</p>
        </div>
      </div>
      <div className="seasons-list">
        {show.seasons.map((season) => (
          <Link key={season.id} to={`/shows/${showId}/seasons/${season.number}`}>
            Season {season.number}
          </Link>
        ))}
      </div>
      <Link to="/" className="back-link">Back to Shows</Link>
    </div>
  );
};

export default SeasonPage;
