import React, { useEffect, Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from './store/index';
import Navbar from './components/navbar/Navbar';

const Home = lazy(() => import('./components/home/Home'));
const Signup = lazy(() => import('./components/signup/Signup'));
const Login = lazy(() => import('./components/login/Login'));
const Todo = lazy(() => import('./components/todo/Todo'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem('id')) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  // fetch("https://todo-backend-param.onrender.com").then((res) => res.text()).then((data) => console.log(data)).catch((err) => console.log(err));

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
