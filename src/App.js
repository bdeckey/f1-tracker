import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Selector from "./pages/Selector";
import Leaderboard from "./pages/Leaderboard";
import Splash from "./components/Splash";
import animationData from "../src/assets/changingCar.json";

// const loadUser = (user, accessToken) => {
//   DataService.fetchUser({ email: user.email })
//     .then((response) => {
//       // console.log("Fetching User Information");

//       setUserLoaded(response.data.user);
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

function App() {
  return (
    <div className="App">
      <Splash animationData={animationData}>
        <Router>
          <Routes>
            <Route path="/" element={<Leaderboard />} />
            <Route path="/pick" element={<Selector />} />
          </Routes>
        </Router>
      </Splash>
    </div>
  );
}

export default App;
