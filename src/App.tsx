import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import themed components (to be created)
import DefaultLanding from './components/DefaultLanding';
import MilitaryLanding from './components/MilitaryLanding';
import RacecarLanding from './components/RacecarLanding';
import SpaceshipLanding from './components/SpaceshipLanding';
import MidnightLanding from './components/MidnightLanding';
import AliensLanding from './components/AliensLanding';
import EgyptLanding from './components/EgyptLanding';
import CircusLanding from './components/CircusLanding';
import FootballLanding from './components/FootballLanding';
import NewsroomLanding from './components/NewsroomLanding';
import PoliceLanding from './components/PoliceLanding';
import ZoomRedirect from './components/ZoomRedirect';
import BBGlobalSolutionsLanding from './components/BBGlobalSolutionsLanding';
import StarWarsHyperspace from './components/StarWarsHyperspace';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLanding />} />
        <Route path="/military" element={<MilitaryLanding />} />
        <Route path="/racecar" element={<RacecarLanding />} />
        <Route path="/spaceship" element={<SpaceshipLanding />} />
        <Route path="/midnight" element={<MidnightLanding />} />
        <Route path="/aliens" element={<AliensLanding />} />
        <Route path="/egypt" element={<EgyptLanding />} />
        <Route path="/circus" element={<CircusLanding />} />
        <Route path="/football" element={<FootballLanding />} />
        <Route path="/newsroom" element={<NewsroomLanding />} />
        <Route path="/police" element={<PoliceLanding />} />
        <Route path="/zoom" element={<ZoomRedirect />} />
        <Route path="/bb-global" element={<BBGlobalSolutionsLanding />} />
        <Route path="/hyperspace" element={<StarWarsHyperspace />} />
        {/* Additional routes will be added in future prompts:
            /circus, /football, /newsroom, /police */}
      </Routes>
    </div>
  );
}

export default App;
