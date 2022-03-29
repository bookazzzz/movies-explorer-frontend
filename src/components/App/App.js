import React from "react";
import Main from "../Main/Main";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import api from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import { useWindowSize } from "../../hooks/useWindowSize";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  CONFLICT_EMAIL_MESSAGE,
  INVALID_DATA_MESSAGE,
  AUTH_DATA_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  SUCCSESS_UPDATE_MESSAGE,
} from "../../utils/constant";

function App() {
  //Переменная текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });
  // путь где находится пользователь
  let location = useLocation().pathname;
  // Состояние залогиненного пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  //Путь пользователя в браузере
  const history = useHistory();

  // Если залогинились, то перейти на страницу с фильмами
  React.useEffect(() => {
    if (loggedIn === true) {
      history.push("/movies");
    }
  }, [loggedIn]);

  //Проверяем токен после каждого обновления
  React.useEffect(() => {
    tokenCheck();
  }, []);

  // функция проверки токена
  function tokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      api
        .getUser(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            console.log(res);
            setCurrentUser(res.user);
            history.push(location);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          history.push("/");
        });
      console.log(token);
    }
  }

  // функция регистрации
  function handleRegister(name, email, password) {
    api
      .createProfile(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        if (err === "Error 400") {
          return showResMessageTimer(INVALID_DATA_MESSAGE);
        }
        if (err === "Error 409") {
          return showResMessageTimer(CONFLICT_EMAIL_MESSAGE);
        }
        if (err === "Error 500") {
          return showResMessageTimer(SERVER_ERROR_MESSAGE);
        }
        console.log(err);
      });
  }

  // функция логина
  function handleLogin(email, password) {
    api
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err === "Error 400") {
          return showResMessageTimer(INVALID_DATA_MESSAGE);
        }
        if (err === "Error 401") {
          return showResMessageTimer(AUTH_DATA_ERROR_MESSAGE);
        }
        if (err === "Error 500") {
          console.log(SERVER_ERROR_MESSAGE);
          return showResMessageTimer(SERVER_ERROR_MESSAGE);
        }
        console.log(err);
      });
  }

  //функция обновления профиля
  function handleUpdateProfile(name, email) {
    api
      .updateProfile(name, email)
      .then((res) => {
        if (res) {
          setCurrentUser({
            ...currentUser,
            name: res.name,
            email: res.email,
          });
          showResMessageTimer(SUCCSESS_UPDATE_MESSAGE);
        }
      })
      .catch((err) => {
        showResMessageTimer(SERVER_ERROR_MESSAGE);
        console.log(err);
      });
  }

  //функция выхода
  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setMovies([]);
    setMoviesAction([]);
    setValueSave("");
    setValue("");
    history.push("/");
  }

  // Стейт загрузки
  const [isLoading, setIsLoading] = React.useState(false);

  // кастомный хук который следит за шириной экрана
  const { width } = useWindowSize();

  //показывает ошибку поиска
  const [showError, setShowError] = React.useState("");

  //сколько будет отоброжаться карточек
  const counterCard =
    (width >= 1280 && 12) ||
    (width >= 768 && width < 1280 && 8) ||
    (width >= 320 && width < 768 && 5);

  //сколько будет добавляться карточек
  const addedCar =
    (width >= 1280 && 3) ||
    (width >= 768 && width < 1280 && 2) ||
    (width >= 320 && width < 768 && 2);

  //храним все фильмы в стейте movies
  const [movies, setMovies] = useLocalStorage("all_movies", []);

  //стейт для филтрованных фильмов
  const [moviesAction, setMoviesAction] = useLocalStorage("movies_action", []);

  // стейт для сохраненных фильмов
  const [saveMoviesAction, setSaveMoviesAction] = useLocalStorage(
    "save_movies_action",
    []
  );

  //колличество новых добавляемых карточек
  const [newItem, setNewItem] = React.useState(addedCar);

  //состояние инпут поля для поиска
  const [value, setValue] = useLocalStorage("serach_value", "");
  const [valueSave, setValueSave] = useLocalStorage("serach_value_save", "");

  //Сетаем все фильмы в movies с помощью useEffect
  const showAllMovies = async () => {
    setIsLoading(true);
    try {
      const res = await getMovies();
      const allMovies = res.map((item) => {
        const imageURL = item.image
          ? `https://api.nomoreparties.co${item.image.url}`
          : "https://res.cloudinary.com/teepublic/image/private/s--OXUPFdsw--/t_Preview/b_rgb:191919,c_lpad,f_jpg,h_630,q_90,w_1200/v1606803184/production/designs/16724220_0.jpg";
        const thumbnailURL = item.image
          ? `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`
          : "https://res.cloudinary.com/teepublic/image/private/s--OXUPFdsw--/t_Preview/b_rgb:191919,c_lpad,f_jpg,h_630,q_90,w_1200/v1606803184/production/designs/16724220_0.jpg";
        const noAdaptedName = item.nameEN ? item.nameEN : item.nameRU;
        const countryValue = item.country ? item.country : "none";
        return {
          country: countryValue,
          director: item.director,
          duration: item.duration,
          year: item.year,
          description: item.description,
          image: imageURL,
          trailer: item.trailerLink,
          thumbnail: thumbnailURL,
          movieId: item.id,
          nameRU: item.nameRU,
          nameEN: noAdaptedName,
        };
      });
      setMovies(allMovies);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  //функция получения всех фильмов пользователя
  const getFilm = async () => {
    const res = await api.getUserMovies();
    setSaveMoviesAction(res);
  };

  //Функция для добавления фильма
  const addedMovie = async (movie) => {
    await api.createMovie(movie);
    getFilm();
  };

  //удаление фильма из пользовательского запроса
  const removeMovie = async (movie) => {
    const id = saveMoviesAction.find((f) => f.movieId === movie.movieId)._id;
    await api.deleteMovie(id);
    getFilm();
  };

  React.useEffect(() => {
    getFilm();
  }, []);

  React.useEffect(() => {
    if (loggedIn) showAllMovies();
    setShowError("");
  }, [loggedIn]);

  //фильтрация короткометражек
  const showShortMovies = (moviesF) => {
    return moviesF?.filter((f) => f.duration <= 40);
  };

  // helper поиска по иназванию
  const findByNameFilm = (movies, value) => {
    const res = movies.filter((f) =>
      f.nameRU.toLowerCase().includes(value.toLowerCase())
    );

    if (res.length === 0) {
      setShowError("Ничего не найдено");
    }
    return res;
  };

  //поиск по названию всех фильмов
  const submitFindByNameFilm = (value) => {
    showAllMovies();
    setMoviesAction(findByNameFilm(movies, value));
  };

  //поиск по названию сохраненок
  const submitFindByNameSaveFilm = async (value) => {
    const res = await api.getUserMovies();
    showAllMovies();
    setSaveMoviesAction(findByNameFilm(res, value));
  };

  //функция для добавления новых карточек по нажатию на кнопку
  const addedNewCard = () => {
    setNewItem(newItem + addedCar);
  };

  //находим все совпадения по айдишкам для лайка
  function findLike(movie) {
    return saveMoviesAction.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
  }
  const [apiResMessage, setApiResMessage] = React.useState(" ");

  function showResMessageTimer(error) {
    setApiResMessage(error);
    setTimeout(() => setApiResMessage(""), 10000);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              apiResMessage={apiResMessage}
            />
          </Route>

          <Route path="/signin">
            <Login onLogin={handleLogin} apiResMessage={apiResMessage} />
          </Route>

          <ProtectedRoute
            loggedIn={loggedIn}
            component={Profile}
            onSignOut={signOut}
            onEditProfile={handleUpdateProfile}
            path="/profile"
          />

          <ProtectedRoute
            component={Movies}
            loggedIn={loggedIn}
            path="/movies"
            removeMovie={removeMovie}
            submitFindByNameFilm={submitFindByNameFilm}
            addedNewCard={addedNewCard}
            newItem={newItem}
            counterCard={counterCard}
            movies={moviesAction}
            showShortMovies={showShortMovies}
            addedMovie={addedMovie}
            findLike={findLike}
            value={value}
            setValue={setValue}
            showError={showError}
            setShowError={setShowError}
            isLoading={isLoading}
          />

          <ProtectedRoute
            component={SavedMovies}
            loggedIn={loggedIn}
            path="/saved-movies"
            movies={saveMoviesAction}
            newItem={newItem}
            counterCard={counterCard}
            showShortMovies={showShortMovies}
            removeMovie={removeMovie}
            submitFindByNameFilm={submitFindByNameSaveFilm}
            findLike={findLike}
            value={valueSave}
            setValue={setValueSave}
            showError={showError}
            setShowError={setShowError}
          />

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
