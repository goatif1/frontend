import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicHomePage from '../public/pages/home/PublicHomePage';
import HomePage from '../public/pages/home/HomePage';
import { hasToken } from '../utils/access';
import LeaguesPage from '../public/pages/leagues/LeaguesPage';
import LeagueDetailPage from '../public/pages/leagues/LeagueDetailPage';
import ChampionshipDetailPage from '../public/pages/championships/ChampionshipDetailPage';

const AppRoutes = (props) => {
    const can_access = (path) => {
        return hasToken(path);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<PublicHomePage/>}/>
                <Route path="/home" element= { 
                    can_access("/home") ? <HomePage/> : <Navigate to={{ pathname: "/"}} />
                }/>
                <Route path="/leagues" element= {<LeaguesPage/>}/>
                <Route path="/leagues/:id_league" element={<LeagueDetailPage/>}/>
                <Route path="/championships/:id_championship" element={<ChampionshipDetailPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;