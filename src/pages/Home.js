import React, { useEffect, useState } from "react";
import DataService from "../services/DataService";
import { useNavigate } from "react-router-dom";
import Selector from "./Selector";

const Home = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== null) {
      let parsed = JSON.parse(token);
      if (!("email" in parsed)) {
        navigate("/");
      } else {
        setUser(parsed);
        loadUsers(parsed);
      }
    }
  }, []);

  const updateUserInfo = (userList, user) => {
    if (user && userList.length > 0) {
      for (let i in userList) {
        if (userList[i].name === user.name) {
          let newInfo = {
            ...user,
            races: userList[i].races,
            points: userList[i].points,
          };

          setUser(newInfo);
          localStorage.setItem("accessToken", JSON.stringify(newInfo));
        }
      }
    }
  };

  const loadUsers = (parsed) => {
    DataService.getAllUsers()
      .then((response) => {
        // console.log("Fetching User Information");
        // console.log(response.data);
        setUsers(response.data.response);
        updateUserInfo(response.data.response, parsed);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logout = () => {
    localStorage.setItem("accessToken", null);
    navigate("/");
  };

  return (
    <div>
      <div className="absolute top-2 md:top-10 md:right-20 right-2 ">
        <button
          onClick={() => logout()}
          className="px-2 py-1 bg-gray-400 rounded-lg shadow-lg"
        >
          Log Out
        </button>
      </div>

      <div className="flex justify-center mb-3 pt-10">
        <p className="text-xl font-bold">
          <span className="text-red-600">F</span>
          <span className="font-light text-red-600">ortune </span>1 Home
        </p>
      </div>
      {user ? (
        user.races.length > 0 ? (
          <div className="flex justify-center">
            <div className=" lg:w-1/2 p-2 px-4 border-2 border-dashed border-gray-100 rounded-lg">
              <p>User Picks - {user.races[0].raceTitle}</p>

              {user.races[0].racePicks.map((val, index) => {
                let team = val.team;
                let name = val.name;

                return (
                  <div className="flex flex-row items-center space-x-5 justify-center my-2 border-b-solid border-b-2 border-gray-50 ease hover:py-1">
                    <p className="w-1/6 text-xs ">#{index + 1} </p>
                    <p className="w-1/2 text-sm"> {name}</p>
                    <p className="w-2/5 text-xs"> {team}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <Selector email={user.email} />
        )
      ) : null}

      {/* <div className="">
        <p>Leaderboards</p>
        {users.map((val) => {
          return (
            <div className="flex flex-row space-x-5 justify-center">
              <p>{val.name}</p>
              <p>{val.points}</p>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};
export default Home;
