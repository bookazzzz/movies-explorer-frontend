import React from "react";
import Main from "../Main/Main";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  //Переменная текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });

  // Состояние залогиненного пользователя
  const [loggedIn, setLoggedIn] = React.useState(true);

  //Путь пользователя в браузере
  const history = useHistory();

  // Если залогинились, то перейти на страницу с фильмами
  React.useEffect(() => {
    if (loggedIn === true) {
      history.push("/movies");
    }
  }, [loggedIn]);

  // функция выхода
  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <div className="App">
          <Route path="/signup">
            <Register />
          </Route>

          <Route path="/signin">
            <Login />
          </Route>

          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          <Route path="/profile">
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Profile}
              onSignOut={signOut}
            />
          </Route>

          <Route path="/movies">
            <ProtectedRoute component={Movies} loggedIn={loggedIn} />
          </Route>

          <Route path="/saved-movies">
            <ProtectedRoute component={SavedMovies} loggedIn={loggedIn} />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </div>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
