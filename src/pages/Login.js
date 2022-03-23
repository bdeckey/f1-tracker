import React, { useEffect, useState } from "react";
import DataService from "../services/DataService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [areSigningUp, setAreSigningUp] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const changePass = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const loginOrSignup = (login) => {
    setLoading(true)
    if (login) {
      if (email !== "" && password !== "") {
        DataService.fetchUser({ login: true, email: email, password: password })
          .then((response) => {
            console.log("Fetching User Information");
            console.log(response.data);
            setLoading(false)
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setLoading(false)
        setError("Please answer email and password");
        toast.error("Please answer email and password", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Please answer email and password");
      }
    } else {
      if (email !== "" && password !== "" && name !== "") {
        DataService.fetchUser({
          login: false,
          email: email,
          password: password,
          name: name,
        })
          .then((response) => {
            console.log("Fetching User Information");
            console.log(response.data);
            setLoading(false)
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setLoading(false)
        setError("Please answer email, name, and password");
        toast.error("Please answer email, name, and password", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Please answer email, name, and password");
      }
    }

    
  };

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className=" bg-red-50" style={{ minHeight: "100vh" }}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex justify-center pt-20">
        <div className="bg-gray-50 px-10 py-10 mx-10 rounded-lg shadow-2xl text-left w-full md:w-1/2 xl:w-1/3">
          <div className="flex justify-center mb-3">
            <p className="text-xl font-bold">
              <span className="text-red-600">F</span>
              <span className="font-light text-red-600">ortune </span>1
            </p>
          </div>

          <div className="mt-3">
            <p className="font-light">Email</p>
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              placeholder="email"
              className="p-1 rounded border-solid border-2 border-black font-light"
              style={{ width: "100%" }}
            />
          </div>
          <div className="mt-3">
            <p className="font-light">Password</p>
            <input
              onChange={(event) => changePass(event)}
              type="password"
              placeholder="password"
              className="p-1 rounded border-solid border-2 border-black font-light"
              style={{ width: "100%" }}
            />
          </div>

          {loading ? (
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8 mr-6" />
          ) : (
            <>
              {areSigningUp ? (
                <div className="mt-3">
                  <p className="font-light">Name</p>
                  <input
                    type="text"
                    // onChange={}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="name"
                    className="p-1 rounded border-solid border-2 border-black font-light"
                    style={{ width: "100%" }}
                  />
                </div>
              ) : null}

              <div className="flex flex-row space-x-3 mt-5">
                {!areSigningUp ? (
                  <>
                    <button
                      onClick={() => loginOrSignup(true)}
                      className="bg-gray-300 px-4 py-1 rounded-lg w-2/3 text-sm"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setAreSigningUp(true)}
                      className="bg-gray-300 px-4 py-1 rounded-lg text-sm"
                    >
                      Register
                    </button>
                  </>
                ) : null}

                {areSigningUp ? (
                  <>
                    <button
                      onClick={() => loginOrSignup(false)}
                      className="bg-gray-300 px-4 py-1 rounded-lg text-sm w-full"
                    >
                      Confirm Registration
                    </button>
                    <button
                      onClick={() => setAreSigningUp(false)}
                      className="bg-gray-300 px-4 py-1 rounded-lg text-sm"
                    >
                      Back
                    </button>
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
