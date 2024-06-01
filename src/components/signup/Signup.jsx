// Signup.jsx

import React from "react";
import "./Signup.css"; // Import the corresponding CSS file

export default function Signup() {
    return (
        <div className="signup">
            <div className="content1">
                <h2>Sign Up</h2>
                <form>
                    {/* Input fields for signup form */}
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}
