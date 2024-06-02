import React  from "react";
import "../signup/Signup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authActions } from "../../store/index";
import { useDispatch } from "react-redux";
import "../signup/Signup.jsx";

export default function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [input, setInput] = useState({
        email: `${sessionStorage.getItem("email")}`,
        password: `${sessionStorage.getItem("password")}`,
    });
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();

        if (input.email === "" || input.password === "") {
            toast.error("Please fill all the fields");
            return;
        }

        try {
            const res = await axios.post(
                "https://todo-backend-param.onrender.com/api/v1/signin",
                input
            );

            if (res.status === 200) {
                sessionStorage.setItem("id", res.data.others._id);
                dispatch(authActions.login());
                history("/todo");
            } else {
                toast.error(res.data.message);
            }

            setInput({
                email: "",
                password: "",
            });
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="signup">
            <ToastContainer />
            <div className="content1">
                <h2>Login</h2>
                <form>
                    <input
                        onChange={change}
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={input.email}
                    />
                    <input
                        onChange={change}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={input.password}
                    />
                    <button onClick={submit} type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
