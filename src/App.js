
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
import Selector from './pages/Selector';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Leaderboard />}
          />
            <Route
            path="/pick"
            element={<Selector />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
