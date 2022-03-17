import { range } from "lodash";
import react, { useState, useEffect } from "react";

const lineup = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
  [9, 10],
  [11, 12],
  [13, 14],
  [15, 16],
  [17, 18],
  [19, 20],
];

const racers = [
  "Mercedes,Lewis Hamilton",
  "Mercedes,George Russell",
  "Red Bull,Max Verstappen",
  "Red Bull,Sergio Perez",
  "McLaren,Daniel Ricciardo",
  "McLaren,Lando Norris",
  "Ferrari,Charles Leclerc",
  "Ferrari,Carlos Sainz",
  "Alpine ,Fernando Alonso",
  "Alpine ,Esteban Ocon",
  "AlphaTauri ,Pierre Gasly",
  "AlphaTauri ,Yuki Tsunoda",
  "Aston Martin ,Lance Stroll",
  "Aston Martin ,Sebastian Vettel",
  "Alfa Romeo, Valtteri Bottas",
  "Alfa Romeo ,Guanyu Zhou",
  "Williams ,Alex Albon",
  "Williams, Nicholas Latifi",
  "Haas, Mick Schumacher",
  "Haas, Kevin Magnussen",
];

const Selector = (props) => {
  const [picks, setPicks] = useState([]);
  const [racersLeft, setRacersLeft] = useState(racers);
  const [selectedGridSpot, setSelectedGridSpot] = useState("");
  const [selectedRacer, setSelectedRacer] = useState("");

  const [rulesOpen, setRulesOpen] = useState(false);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 20, i++; ) {
      temp.push(0);
    }
    setPicks(temp);
  }, []);

  const addPick = (index, name) => {
    let temp = [...picks];
    temp[index] = name;
    setPicks(temp);
    setRacersLeft(racersLeft.filter((val) => val !== name));
  };

  const removePick = (index) => {
    let temp = [...picks];
    let removed = temp[index];
    temp[index] = 0;
    setPicks(temp);
    setRacersLeft([...racersLeft, removed]);
  };

  const selectGridSpot = (num) => {
    if (selectedRacer !== "") {
      addPick(num, selectedRacer);
      setSelectedGridSpot("");
      setSelectedRacer("");
    } else {
      setSelectedGridSpot(num);
    }
  };

  const selectRacer = (racer) => {
    if (selectedGridSpot !== "") {
      addPick(selectedGridSpot, racer);
      setSelectedGridSpot("");
      setSelectedRacer("");
    } else {
      setSelectedRacer(racer);
    }
  };

  const GridSlot = ({ num, index }) => {
    let picked = picks[num - 1] || false;
    let firstLetterFirst;
    let firstLetterLast;
    let firstLetterTeam;
    if (picked) {
      let split = picked.split(",");
      let names = split[1].split(" ");
      firstLetterFirst = names[0];
      firstLetterLast = names[1][0];
      firstLetterTeam = split[0];
    }

    const whenClicked = () => {
      if (picked) {
        removePick(num - 1);
      } else {
        selectGridSpot(num - 1);
      }
    };

    return (
      <button
        onClick={() => whenClicked()}
        className={
          (index === 0 ? "" : "mt-5 ") +
          " border-white border-solid border-t-2 border-x-2 p-4 flex justify-center hover:bg-gray-700"
        }
        style={{ width: "100px", height: "80px" }}
      >
        {picked ? (
          <div className="text-white">
            <p className="text-xs">{firstLetterTeam}</p>
            <p className="text-sm">
              {firstLetterFirst} {firstLetterLast}
            </p>
          </div>
        ) : (
          <p className="text-white">{num}</p>
        )}
      </button>
    );
  };

  const Racer = ({ name }) => {
    let split = name.split(",");
    let fullname = split[1];
    let team = split[0];
    let selected = selectedRacer === name;

    return (
      <button
        onClick={() => selectRacer(name)}
        className={
          (selected ? "border-blue-400 rounded-lg  " : "border-grey-50 ") +
          " p-3 border-2 border-solid hover:bg-gray-300 ease hover:rounded-lg m-3"
        }
        style={{ height: "75px", width: "200px" }}
      >
        <p className="text-sm">{team}</p>
        <p>{fullname}</p>
      </button>
    );
  };

  const copytoClipboard = () => {
    /* Get the text field */
    let copyText = "Bahrain - March 20 \n";
    for (let i in picks) {
      let place = parseInt(i) + 1;
      copyText += `#${place} ` + picks[i] + "\n";
    }
    copyText += "\n\n\n";
    for (let i in picks) {
      copyText += picks[i] + "-";
    }

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);
  };

  const picksToString = () => {
    let emailString = "Bahrain - March 20%0A";
    for (let i in picks) {
      let place = parseInt(i) + 1;
      emailString += `#${place} ` + picks[i] + "%0A";
    }
    emailString += "%0A%0A%0A";
    for (let i in picks) {
      emailString += picks[i] + "-";
    }
    return emailString;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center">
      <div
        className="hidden bg-gray-800 sm:flex flex-col w-full sm:w-auto sm:px-10 sm:mr-10"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="border-2 border-dotted border-yellow-400"
          style={{ height: "5px", width: "100%" }}
        ></div>
        <a
          href={`mailto:bdeckey85@gmail.com?subject=F1%20Picks&body=${picksToString()}`}
          className="mb-5 text-white text-lg border-solid border-white border-2 rounded-lg hover:bg-white hover:text-gray-800"
        >
          {" "}
          Submit Picks{" "}
        </a>
        
        <p className="text-center text-white text-lg my-1">
          Bahrain - March 20
        </p>
        {lineup.map((val) => {
          return (
            <div className="flex flex-row justify-center space-x-5 ">
              {val.map((num, i) => {
                return <GridSlot num={num} index={i} />;
              })}
            </div>
          );
        })}
      </div>
      <div
        className="hidden sm:flex flex-wrap overflow-y-scroll"
        style={{ marginTop: "12.5vh", height: "75vh", maxWidth: "40vw" }}
      >
        {racersLeft.map((val) => {
          return <Racer name={val} />;
        })}
      </div>

      {rulesOpen ? (
        <div
          className="absolute z-40 bg-white"
          style={{ height: "100vh", width: "100%" }}
        >
          <button
            className="border-solid border-2 border-black px-2 py-1 rounded-lg hover:text-white hover:bg-black mt-10  text-lg"
            onClick={() => setRulesOpen(false)}
          >
            Close
          </button>

          <p className="text-xl mt-10 mb-2">Rules of the Game</p>
          <div className="mx-10">
            <p>
              A <span className="font-bold">correct pick</span> gets{" "}
              <span className="font-bold text-lg">10</span> points.
            </p>
            <p>
              <span className="font-bold">Incorrect picks</span> score the
              following:
            </p>
            <p>1 place away: 8 points</p>
            <p>2 places away: 5 points</p>
            <p>3 places away: 1 point</p>
            <p>4 or more places away: 0 points</p>
          </div>
        </div>
      ) : null}

      <div
        className="sm:hidden overflow-y-scroll bg-gray-800 flex flex-col w-full sm:w-auto sm:px-10 sm:mr-10"
        style={{ maxHeight: "65vh" }}
      >
        <div
          className="bg-white"
          style={{ height: "5px", width: "100%" }}
        ></div>
        <div className="flex flex-row space-x-3 justify-center">
          <a
            href={`mailto:bdeckey85@gmail.com?subject=F1%20Picks&body=${picksToString()}`}
            className=" px-2  text-white text-lg border-solid border-white border-2 rounded-lg hover:bg-white hover:text-gray-800"
          >
            {" "}
            Submit Picks{" "}
          </a>
          <button className="text-white" onClick={() => setRulesOpen(true)}>
            Rules
          </button>
        </div>

        <p className="text-center text-white text-lg my-1">
          Bahrain - March 20
        </p>
        {lineup.map((val) => {
          return (
            <div className="flex flex-row justify-center space-x-5 ">
              {val.map((num, i) => {
                return <GridSlot num={num} index={i} />;
              })}
            </div>
          );
        })}
      </div>
      <div
        className={
          (racersLeft.length === 0
            ? " border-t-2 border-solid border-white bg-gray-800 "
            : "bg-gray-100 ") + " sm:hidden flex-wrap overflow-y-scroll "
        }
        style={{ height: "35vh" }}
      >
        {racersLeft.map((val) => {
          return <Racer name={val} />;
        })}

        {racersLeft.length === 0 ? (
          <div className="mt-10 flex flex-col space-y-3">
            {" "}
            <a
              href={`mailto:bdeckey85@gmail.com?subject=F1%20Picks&body=${picksToString()}`}
              className="mt-10 p-3 text-white text-lg border-solid border-white border-2 rounded-lg hover:bg-white hover:text-gray-800"
            >
              Submit Picks
            </a>
            <button 
            onClick={() => copytoClipboard()}
            className="mt-10 p-3 text-white text-lg border-solid border-white border-2 rounded-lg hover:bg-white hover:text-gray-800">
              Copy Text
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Selector;
