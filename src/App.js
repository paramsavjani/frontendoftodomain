import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Todo from "./components/todo/Todo";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { authActions } from "./store/index";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      dispatch(authActions.login());
    }
  }
  );
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
