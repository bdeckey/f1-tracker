
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
import Selector from './pages/Selector';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
          path="/login"
          element={<Login/>}
          />
          <Route
          path="/select"
          element={<Selector/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
