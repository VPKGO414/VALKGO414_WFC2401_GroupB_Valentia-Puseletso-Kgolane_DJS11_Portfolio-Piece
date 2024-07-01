import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/episodePage.css';

interface Episode {
  id: number;
  title: string;
  audioUrl: string;
  description: string;
}

interface Season {
  id: number;
  number: number;
  episodes: Episode[];
}

interface Show {
  id: number;
  title: string;
  seasons: Season[];
}

interface EpisodePageParams {
  showId: string;
  seasonNumber: string;
}

const EpisodePage: React.FC = () => {
  const { showId, seasonNumber } = useParams<EpisodePageParams>();
  const [show, setShow] = useState<Show | null>(null);
  const [season, setSeason] = useState<Season | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await api.get(`/id/${showId}`);
        const fetchedShow = response.data;
        setShow(fetchedShow);
        const fetchedSeason = fetchedShow.seasons.find((s: Season) => s.number.toString() === seasonNumber);
        setSeason(fetchedSeason || null);
      } catch (error) {
        setError('Error fetching show details.');
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [showId, seasonNumber]);

  const addToFavorites = (episode: Episode) => {
    const newFavorite = {
      ...episode,
      showTitle: show?.title || '',
      addedDate: new Date().toLocaleDateString(),
    };
    // Logic to persist favorite in localStorage or backend
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!season) {
    return <div>Season not found.</div>;
  }

  return (
    <div className="episode-page">
      <h2>{`Season ${season.number}`}</h2>
      <div className="episode-list">
        {season.episodes.map((episode) => (
          <div key={episode.id} className="episode-card">
            <h3>{episode.title}</h3>
            <audio controls>
              <source src={episode.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p>{episode.description}</p>
            <button onClick={() => addToFavorites(episode)}>Add to Favorites</button>
          </div>
        ))}
      </div>
      <Link to={`/shows/${showId}`} className="back-link">Back to Seasons</Link>
    </div>
  );
};

export default EpisodePage;
