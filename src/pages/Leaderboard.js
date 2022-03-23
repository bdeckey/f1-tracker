import react, { useState, useEffect } from "react";
import { picks } from "../data/picks";
import { ArrowCircleLeftIcon, XIcon } from "@heroicons/react/solid";

const qualyResults = [
  "Ferrari,Charles Leclerc",
  "Red Bull,Max Verstappen",
  "Ferrari,Carlos Sainz",
  "Red Bull,Sergio Perez",
  "Mercedes,Lewis Hamilton",
  "Alfa Romeo, Valtteri Bottas",
  "Haas, Kevin Magnussen",
  "Alpine ,Fernando Alonso",
  "Mercedes,George Russell",
  "AlphaTauri ,Pierre Gasly",
  "Alpine ,Esteban Ocon",
  "Haas, Mick Schumacher",
  "McLaren,Lando Norris",
  "Williams ,Alex Albon",
  "Alfa Romeo ,Guanyu Zhou",
  "AlphaTauri ,Yuki Tsunoda",
  "Aston Martin ,Sebastian Vettel",
  "McLaren,Daniel Ricciardo",
  "Aston Martin ,Lance Stroll",
  "Williams, Nicholas Latifi",
];

const finalResults = [
  "Ferrari,Charles Leclerc",
  "Ferrari,Carlos Sainz",
  "Mercedes,Lewis Hamilton",
  "Mercedes,George Russell",
  "Haas, Kevin Magnussen",
  "Alfa Romeo, Valtteri Bottas",
  "Alpine ,Esteban Ocon",
  "AlphaTauri ,Yuki Tsunoda",
  "Alpine ,Fernando Alonso",
  "Alfa Romeo ,Guanyu Zhou",
  "Haas, Mick Schumacher",
  "Aston Martin ,Lance Stroll",
  "Williams ,Alex Albon",
  "McLaren,Daniel Ricciardo",
  "McLaren,Lando Norris",
  "Williams, Nicholas Latifi",
  "Aston Martin ,Sebastian Vettel",
  "Red Bull,Sergio Perez",
  "Red Bull,Max Verstappen",
  "AlphaTauri ,Pierre Gasly",
];

const Leaderboard = (props) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    let tempStats = [];
    for (let i in picks) {
      
      let username = picks[i].user;
      let late = picks[i].late && true;
      let userPicks = picks[i].picks.split("-");
      userPicks = userPicks.filter((value) => value !== undefined && value !== "")
      let points = 0;
      let scoreSheet = [];
      for (let i in userPicks) {
        let diff = Math.abs(finalResults.indexOf(userPicks[i]) - i);

        switch (diff) {
          case 0:
            points += 10;
            scoreSheet.push(10);
            console.log(username, " scored 10 points for pick: ", userPicks[i]);
            break;
          case 1:
            scoreSheet.push(8);
            console.log(username, " scored 8 points for pick: ", userPicks[i]);
            points += 8;
            break;
          case 2:
            console.log(username, " scored 5 points for pick: ", userPicks[i]);
            points += 5;
            scoreSheet.push(5);
            break;
          case 3:
            console.log(username, " scored 1 points for pick: ", userPicks[i]);
            points += 1;
            scoreSheet.push(1);
            break;
          default:
            scoreSheet.push(0);
            console.log(username, " scored 0 points for pick: ", userPicks[i]);
            break;
        }
      }

      tempStats.push({
        username: username,
        points: points,
        scoreSheet: scoreSheet,
        userPicks: userPicks,
        late: late,
      });
    }

    setStats(tempStats.sort((a, b) => b.points - a.points));
  }, []);

  const Row = ({ userRow, place }) => {
    const [showStats, setShowStats] = useState(false);
    const [resultsOrPicks, setResultsOrPicks] = useState(false);
    return (
      <div className="ease">
        <button
          onClick={() => setShowStats(!showStats)}
          className=" w-full flex flex-row items-center relative space-x-5 justify-center py-2 relative z-0 bg-gray-100 hover:bg-gray-200 ease"
        >
          <p className="absolute left-5 text-xs text-gray-400 font-bold">
            {" "}
            #{place + 1}
          </p>
          <p className="w-1/4"> {userRow.points}</p>
          <p className="w-1/4">
            {" "}
            {userRow.username}
            {userRow.late ? "*" : ""}{" "}
          </p>

          {/* <p className="w-1/4"> </p> */}
          {/* <button onClick={() => setShowStats(!showStats)}>
            {" "}
            {showStats ? "hide" : "show stats"}
          </button> */}
        </button>
        <div className="ease ">
          {showStats ? (
            <div
              className="absolute bg-white z-20 shadow-lg py-10 px-2 top-0 flex flex-col w-full xl:w-2/3"
              style={{
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
            >
              <button onClick={() => setShowStats(false)}>
                <ArrowCircleLeftIcon className=" absolute top-2 left-2 h-10 " />
              </button>
              <div className="flex flex-row space-x-3 justify-center items-center">
                <p className="text-2xl  font-bold text-left items-center">
                  {userRow.username}
                </p>
                <p className="  p-1 rounded-xl "> {userRow.points} points</p>
                <button
                  onClick={() => setResultsOrPicks(!resultsOrPicks)}
                  className="w-auto  p-2 bg-gray-400 flex text-sm text-gray-50 rounded-xl hover:bg-gray-50 hover:text-gray-400 "
                >
                  {/* {resultsOrPicks ? "Final Results" : "User Picks"} */}
                  Change View
                </button>
              </div>

              <div className="flex flex-col space-x-5 mt-5">
                {resultsOrPicks ? (
                  <div className=" p-2 px-4 border-2 border-dashed border-gray-100 rounded-lg">
                    <p>Final Results</p>
                    {finalResults.map((row, index) => {
                      let team = row.split(",")[0];
                      let name = row.split(",")[1];
                      let points =
                        userRow.scoreSheet[userRow.userPicks.indexOf(row)];
                      let pointsString = "";
                      switch (points) {
                        case 10:
                          pointsString = "bg-green-600 text-green-200 ";
                          break;
                        case 8:
                          pointsString = "bg-green-400 text-green-200";
                          break;
                        case 5:
                          pointsString = "bg-yellow-300 text-yellow-100";
                          break;
                        case 1:
                          pointsString = "bg-yellow-500 text-yellow-100";
                          break;
                        case 0:
                          pointsString = "bg-slate-100 text-gray-200";
                          break;
                      }
                      return (
                        <div className="flex flex-row items-center space-x-5 justify-center my-2 border-b-solid border-b-2 border-gray-50 ease hover:py-1">
                          <p className="w-1/6 text-xs ">#{index + 1} </p>
                          <p className="w-1/2 text-sm"> {name}</p>
                          <p className="w-2/5 text-xs"> {team}</p>
                          <div
                            className={
                              pointsString +
                              " w-1/6 flex items-center text-xs font-bold text-center justify-center p-1 rounded-full "
                            }
                          >
                            <span className="text-xs">
                              {points > 0 ? "+" : ""}
                            </span>
                            <p> {points}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className=" p-2 px-4 border-2 border-dashed border-gray-100 rounded-lg">
                    <p>User Picks</p>
                    {userRow.userPicks.map((row, index) => {
                      let team = row.split(",")[0];
                      let name = row.split(",")[1];
                      let points = userRow.scoreSheet[index];
                      let pointsString = "";
                      switch (points) {
                        case 10:
                          pointsString = "bg-green-600 text-green-200 ";
                          break;
                        case 8:
                          pointsString = "bg-green-400 text-green-200";
                          break;
                        case 5:
                          pointsString = "bg-yellow-300 text-yellow-100";
                          break;
                        case 1:
                          pointsString = "bg-yellow-500 text-yellow-100";
                          break;
                        case 0:
                          pointsString = "bg-slate-100 text-gray-200";
                          break;
                      }
                      return (
                        <div className="flex flex-row items-center space-x-5 justify-center my-2 border-b-solid border-b-2 border-gray-50 ease hover:py-1">
                          <p className="w-1/6 text-xs ">#{index + 1} </p>
                          <p className="w-1/2 text-sm"> {name}</p>
                          <p className="w-2/5 text-xs"> {team}</p>
                          <div
                            className={
                              pointsString +
                              " w-1/6 flex items-center text-xs font-bold text-center justify-center p-1 rounded-full "
                            }
                          >
                            <span className="text-xs">
                              {points > 0 ? "+" : ""}
                            </span>
                            <p> {points}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  console.log(picks);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-10 text-2xl">
        <p>Leaderboard</p>
      </div>
      <p className="text-xs text-grey-400">
        (*) denotes picks made after qualifier
      </p>
      <div className="ease w-11/12 sm:w-3/4">
        <div className="flex flex-row space-x-5 justify-center mt-3 text-xl font-bold">
          {/* <p className="w-1/4"> Points</p> */}
          {/* <p className="w-1/4"> Name</p> */}
          {/* <p className="w-1/4"> Post-Qualification</p> */}
          {/* <p className="w-1/4"> Stats</p> */}
        </div>
        <div className="relative ">
          {stats &&
            stats.map((val, index) => {
              console.log(val);
              return <Row userRow={val} place={index} />;
            })}
        </div>
      </div>
    </div>
  );
};
export default Leaderboard;
