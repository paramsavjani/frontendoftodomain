// Login.jsx

import React from "react";
import "../signup/Signup.css"; // Import the corresponding CSS file

export default function Login() {
    return (
        <div className="signup">
            <div className="content1">
                <h2>Login</h2>
                <form>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
