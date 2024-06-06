import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const history = useNavigate();
    const [input, setInput] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();

        if (
            input.username === "" ||
            input.email === "" ||
            input.password === ""
        ) {
            toast.error("Please fill all the fields");
            return;
        }
        setIsLoading(true);

        try {
            const res = await axios.post(
                "https://todo-backend-param.onrender.com/api/v1/register",
                input
            );

            if (res.status === 200) {
                toast.success(res.data.message, {
                    autoClose: 1000,
                    position: "top-right",
                    type: "success",
                    pauseOnHover: false,
                });
                localStorage.setItem("email", input.email);
                localStorage.setItem("password", input.password);
                history("/login");
            } else {
                toast.error(res.data.message);
            }

            setInput({
                email: "",
                username: "",
                password: "",
            });
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
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
                <h2>Sign Up</h2>
                <div className="form">
                    <input
                        onChange={change}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={input.username}
                    />
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
                                <span>Signing Up...</span>
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
