import React, { useEffect, useState } from "react";
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

function App() {
  console.log("render");
  //Переменная текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });
  console.log(currentUser);
  //Переменная загрузки
  const [isLoading, setIsLoading] = React.useState(false);
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

  // функция проверки токена
  function tokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoading(true);
      api
        .getUser(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);

            setCurrentUser({
              name: res.user.name,
              email: res.user.email,
            });
            history.push(location);
            showAllMovies();
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          history.push("/");
          setIsLoading(false);
        });
      console.log(token);
    }
  }

  //Проверяем токен после каждого обновления
  useEffect(() => {
    console.log("effect");
    tokenCheck();
  }, []);

  // функция регистрации
  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    api
      .createProfile(name, email, password)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  // функция логина
  function handleLogin({ email, password }) {
    setIsLoading(true);
    api
      .login(email, password)
      .then((res) => {
        setIsLoading(false);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  //функция обновления профиля
  function handleUpdateProfile({ name, email }) {
    localStorage.getItem("jwt");
    setIsLoading(true);
    api
      .updateProfile(name, email)
      .then((res) => {
        console.log("updateProfile", res);
        setCurrentUser({ email: res.email, name: res.name, _id: res._id });
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`Ошибка при изменении данных пользователя: ${e}`);
        setIsLoading(false);
      });
  }

  // кастомный хук который следит за шириной экрана
  const { width } = useWindowSize();

  //показывает ошибку поиска
  const [showError, setShowError] = useState("");

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
  const [newItem, setNewItem] = useState(addedCar);

  //состояние инпут поля для поиска
  const [value, setValue] = useLocalStorage("serach_value", "");
  const [valueSave, setValueSave] = useLocalStorage("serach_value_save", "");

  //функция выхода
  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("save_movies_action");
    localStorage.removeItem("movies_action");
    setCurrentUser({
      name: "",
      email: "",
    });
    setLoggedIn(false);
    setMovies([]);
    setMoviesAction([]);
    setValueSave("");
    setValue("");
    history.push("/");
  }

  //Сетаем все фильмы в movies с помощью useEffect
  const showAllMovies = async () => {
    setIsLoading(true);
    const res = await getMovies();
    setIsLoading(false);
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
  };

  //функция получения всех фильмов пользователя
  const getFilm = async () => {
    // setIsLoading(true);
    const res = await api.getUserMovies();
    // setIsLoading(false);
    setSaveMoviesAction(res);
  };

  //Функция для добавления фильма
  const addedMovie = async (movie) => {
    // setIsLoading(true);
    await api.createMovie(movie);
    // setIsLoading(false);
    getFilm();
  };

  //удаление фильма из пользовательского запроса
  const removeMovie = async (movie) => {
    const id = saveMoviesAction.find((f) => f.movieId === movie.movieId)._id;
    // setIsLoading(true);
    await api.deleteMovie(id);
    // setIsLoading(false);
    getFilm();
  };

  useEffect(() => {
    getFilm();
  }, [isLoading]);

  useEffect(() => {
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
              isLoading={isLoading}
              loggedIn={loggedIn}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
              loggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute
            loggedIn={loggedIn}
            component={Profile}
            onSignOut={signOut}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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
            isLoading={isLoading}
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
