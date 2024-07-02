import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EpisodePage from './pages/EpisodePage';
import SeasonPage from './pages/SeasonPage';
import PodcastPage from './pages/PodcastPage';
import SignInPage from './pages/SignInPage';
import WelcomePage from './pages/WelcomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/podcast/:id" component={PodcastPage} />
        <Route path="/podcast/:id/seasons/:seasonNumber" component={SeasonPage} />
        <Route path="/podcast/:id/seasons/:seasonNumber/episodes/:episodeId" component={EpisodePage} />
      </Switch>
    </Router>
  );
};

export default App;