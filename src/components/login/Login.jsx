import React from "react";
import "../signup/Signup.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authActions } from "../../store/index";
import { useDispatch } from "react-redux";

export default function Login() {
    const dispatch = useDispatch(); 
    const history = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

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
                "http://192.168.1.7:1000/api/v1/signin",
                input
            );

            if (res.status === 200) {
               toast.success(res.data.message, {
                   autoClose: 1000,
                   position: "top-right",
                   type: "success",
                   pauseOnHover: false,
               });
               sessionStorage.setItem("id", res.data.others._id);
               dispatch(authActions.login());
               setTimeout(() => {
                   history("/todo");
               }, 2000);

            } else {
                toast.error(res.data.message);
            }

            setInput({
                email: "",
                password: ""
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
