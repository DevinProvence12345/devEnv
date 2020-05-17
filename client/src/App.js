import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    //Get cars from backend, using nginx proxy
    fetch("http://localhost:80/api/cars")
      .then(data => data.json())
      .then(data => setCars(data));
  }, []);

  return (
    <div className="App">
      This is the car list which is coming from the backend test:
      <div className="car-list">
        {cars.map(car => {
          return (
            <div>
              <b>{car.name}</b>, color: {car.color}
            </div>
          );
        })}
      </div>
      <a href="https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:4000/signin/callback&client_id=243566847102-u4dk85cmjr12mh2knrpv3ins2tcrps8u.apps.googleusercontent.com">Sign in with google</a>
    </div>
  );
};

export default App;
