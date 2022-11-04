import LoginPage from '../src/components/LoginPage';
import HomePage from './components/HomePage';
import Signup from '../src/components/Signup';
import StudentSignup from '../src/components/StudentSignup';
import TutorSignup from '../src/components/TutorSignup';
import Questions from '../src/components/Questions';
import NewQuestion from '../src/components/NewQuestion';
import SessionsPage from '../src/components/SessionsPage';
import ViewSessions from '../src/components/ViewSessions';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TutorReviewPage from './components/TutorReviewPage';
import AddReviewPage from './components/AddReviewPage';
import ViewReviewPage from './components/ViewReviewPage';

const AppRouter = () => (
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<LoginPage />} exact={true} />
                <Route path="/signup" element={< Signup />} />
                <Route path="/sign-upStudent" element={< StudentSignup />} />
                <Route path='/sign-upTutor' element={< TutorSignup />} />
                <Route path="/home" element={< HomePage />} />
                <Route path="/tutorreview" element={< TutorReviewPage />} />
                <Route path="/addreview" element={< AddReviewPage />} />
                <Route path="/questions" element={< Questions />} />
                <Route path="/newQuestion" element={< NewQuestion />} />
                <Route path="/sessions" element={< SessionsPage />} />
                <Route path="/viewSessions" element={< ViewSessions />} />
                <Route path="/viewreviews" element={< ViewReviewPage />} />
            </Routes>
        </div>
    </Router>

);

export default AppRouter;