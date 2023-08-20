import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicHomePage from '../public/pages/home/PublicHomePage';
import HomePage from '../public/pages/home/HomePage';
import { hasToken } from '../utils/access';
import LeaguesPage from '../public/pages/leagues/LeaguesPage';

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
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;