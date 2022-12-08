import Button from "./components/button";
import "./App.css";

import axios from "axios";
import { Fragment, useState } from "react";

function App() {
  const [userDate, setUserDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [activeLink, setActiveLink] = useState(0);
  const handleOnCLick = () => {
    setLoading(true);
    axios
      .get("https://randomuser.me/api/")
      .then((data) => {
        console.log(data.data.results);
        setUserDate(data.data.results);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      })
      .finally(() => {
        setLoading(false);
        setActiveUser(true);
      });
  };

  const icons = [
    "fas fa-user fa-4x",
    "fas fa-envelope fa-4x",
    "fas fa-calendar-alt fa-4x",
    "fas fa-map-marker fa-4x",
    "fas fa-phone fa-4x",
    "fas fa-lock fa-4x",
  ];

  const PharaseGenerator = ({ user }) => {
    const phares = [
      `Hello my name is ${user.name.first}, and my surname is ${user.name.last}`,
      `Hi my email address is ${user.email}`,
      `I was born on ${user.dob.date.slice(0, 10)}, and I am ${
        user.dob.age
      } years old`,
      `My country is ${user.location.country}, and I live in ${user.location.city}`,
      `My phone number is ${user.phone}`,
      `My password is ${user.login.password}`,
    ];
    return <h1>{phares[activeLink]}</h1>;
  };

  const handleActiveLink = (index) => {
    setActiveLink(index);
  };

  const style = {
    color: "Purple",
  };

  return (
    <div className="app">
      <h2 className>Random User Generetor App</h2>

      <Button isActive={activeUser} clicked={handleOnCLick} />

      {loading ? (
       <div class="loader"></div>
      ) : (
        <div className="app__user">
          {userDate.map((user, index) => {
            return (
              <Fragment key={user.cell}>
                <img src={user.picture.large} alt="User Images" />
                <PharaseGenerator user={user} />
                <div className="app__icons">
                  {icons.map((icon, index) => {
                    return (
                      <i
                        className={icon}
                        key={index}
                        onMouseEnter={() => handleActiveLink(index)}
                        style={activeLink === index ? style : null}
                      ></i>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
