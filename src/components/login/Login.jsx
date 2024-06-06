import React from "react";
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
        email: localStorage.getItem("email")
            ? `${localStorage.getItem("email")}`
            : "",
        password: localStorage.getItem("password")
            ? `${localStorage.getItem("password")}`
            : "",
    });
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    const [isLoading, setIsLoading] = useState(false);

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
        
        setIsLoading(true);
        try {
            const res = await axios.post(
                "https://todo-backend-param.onrender.com/api/v1/signin",
                input
            );

            if (res.status === 200) {
                localStorage.setItem("id", res.data.others._id);
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
        finally{
            setIsLoading(false);
        }
    };

    const addHover = (event) => {
        const button = event.target;
        if (button) {
            button.classList.add("hover");
        }
    };
    const removeHover = (event) => {
        const button = event.target;
        if (button) {
            button.classList.remove("hover");
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
                    <button
                        onClick={submit}
                        onMouseEnter={addHover}
                        onMouseLeave={removeHover}
                        type="submit"
                        className={`${isLoading ? "loading" : ""}`}
                    >
                        {isLoading ? (
                            <>
                                <div className="loader"></div>
                                <span>Logging In...</span>
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
