import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Selector from "./pages/Selector";
import Leaderboard from "./pages/Leaderboard";
import Splash from "./components/Splash";
import animationData from "../src/assets/changingCar.json";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Splash animationData={animationData}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/leader" element={<Leaderboard />} />
            <Route path="/pick" element={<Selector />} />
          </Routes>
        </Router>
      </Splash>
    </div>
  );
}

export default App;
