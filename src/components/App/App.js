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
import { useWindowSize } from '../../hooks/useWindowSize';
import {CONFLICT_EMAIL_MESSAGE,
  INVALID_DATA_MESSAGE,AUTH_DATA_ERROR_MESSAGE,SERVER_ERROR_MESSAGE,SUCCSESS_UPDATE_MESSAGE,} from '../../utils/constant'


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
        console.log(token)
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

  //функция выхода
  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  }

//функция обновления профиля
  function handleUpdateProfile(name, email) {
    api.updateProfile(name, email)
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

  // кастомный хук который следит за шириной экрана
	const { width } = useWindowSize();

  // Стейт загрузки
  const [isLoading, setIsLoading] = React.useState(false);

	//сколько будет отоброжаться карточек
	const counterCard = (width >= 1280 && 12) || (width >= 768 && width < 1280 && 8) || (width >= 320 && width < 768 && 5);

	//сколько будет добавляться карточек
	const addedCar = (width >= 1280 && 3) || (width >= 768 && width < 1280 && 2) || (width >= 320 && width < 768 && 2);

	//храним все фильмы в стейте movies
	const [movies, setMovies] = React.useState([]);

	//стейт для филтрованных фильмов
	const [moviesAction, setMoviesAction] = React.useState([]);

	//состояние фильтрации короткометражки
	const [checked, setChecked] = React.useState(false);

	//состояние инпут поля для поиска
	const [value, setValue] = React.useState('');

	//колличество новых добавляемых карточек
	const [newItem, setNewItem] = React.useState(addedCar);

	//Сетаем все фильмы в movies с помощью useEffect
	React.useEffect(() => {
    setIsLoading(true);
		getMovies()
    .then((res) => {
			setMovies(res.map((el) => ({ ...el, filter: false })));
		})
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setTimeout(() =>{
        setIsLoading(false);
      }, 2000)
  });
	}, []);

	//фильтрация короткометражек
	const showShortMovies = () => {
		setChecked(!checked);
		setValue('');
		setNewItem(0);
		setMoviesAction([]);
	};

	// поиск по иназванию
	const findByNameFilm = () => {
		if (value === '') return;
    setTimeout(() => setIsLoading(false), 1000);
		if (checked) {
			const searchMovies = movies.filter((f) => f.duration <= 40 && f.nameRU.toLowerCase().includes(value.toLowerCase()));
			setMoviesAction(searchMovies);
		} else {
			const searchMovies = movies.filter((f) => f.nameRU.toLowerCase().includes(value.toLowerCase()));
			setMoviesAction(searchMovies);
		}
	};

	//функция для добавления новых карточек по нажатию на кнопку
	const addedNewCard = () => {
		setNewItem(newItem + 3);
	};

	//смена состояния главного стейта
	const changeFilterValue = (id, bool) => {
		setMovies(movies.map((el) => (el.id === id ? { ...el, filter: !bool } : el)));
		setMoviesAction(moviesAction.map((el) => (el.id === id ? { ...el, filter: !bool } : el)));
	};

	// стейт для сохраненных фильмов
	const [saveMoviesAction, setSaveMoviesAction] = React.useState([]);

	//функция для сохранения фильмов
	React.useEffect(() => {
		setSaveMoviesAction(() => movies.filter((f) => f.filter === true));
	}, [movies]);

	//функция для удаления фильмов
	const removeMoviesFunction = (id) => {
		setMoviesAction(moviesAction.map((el) => (el.id === id ? { ...el, filter: false } : el)));
		setMovies(movies.map((el) => (el.id === id ? { ...el, filter: false } : el)));
		setSaveMoviesAction(saveMoviesAction.filter((f) => f.id !== id));
		setChecked(false);
	};

	// показ короткометражек в сохраненках
	const showShortMoviesBySave = () => {
		setChecked(!checked);
		if (!checked) {
			const searchMovies = saveMoviesAction.filter((f) => f.duration <= 40 && f.filter === true);
			setSaveMoviesAction(searchMovies);
		} else if (checked) {
			setSaveMoviesAction(movies.filter((f) => f.filter));
		}
	};

	// поиск по названию
	const findByNameFilmSave = () => {
		if (value === '') return;
		if (checked) {
			const searchMovies = movies.filter((f) => f.duration <= 40 && f.filter === true && f.nameRU.toLowerCase().includes(value.toLowerCase()));
			setSaveMoviesAction(searchMovies);
		} else {
			const searchMovies = movies.filter((f) => f.filter === true && f.nameRU.toLowerCase().includes(value.toLowerCase()));
			setSaveMoviesAction(searchMovies);
		}
	};

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
            <Login 
            onLogin={handleLogin}
            apiResMessage={apiResMessage}
            />
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
						path='/movies'
						addedNewCard={addedNewCard}
						findByNameFilm={findByNameFilm}
						showShortMovies={showShortMovies}
						checked={checked}
						value={value}
						setValue={setValue}
						newItem={newItem}
						counterCard={counterCard}
						moviesAction={moviesAction}
						changeFilterValue={changeFilterValue}
            isLoading={isLoading}
          />

          <ProtectedRoute
            component={SavedMovies}
						loggedIn={loggedIn}
						path='/saved-movies'
						saveMovies={saveMoviesAction}
						newItem={newItem}
						counterCard={counterCard}
						removeMoviesFunction={removeMoviesFunction}
						addedNewCard={addedNewCard}
						showShortMovies={showShortMoviesBySave}
						checked={checked}
						value={value}
						setValue={setValue}
						findByNameFilm={findByNameFilmSave}
            isLoading={isLoading}
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
