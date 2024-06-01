// Home.jsx

import React from "react";
import "./Home.css"; // Import the corresponding CSS file
import { useNavigate } from "react-router-dom";

export default function Home() {
    const history = useNavigate();
    return (
        <div className="home">
            <div className=""></div>
            <div className="content">
                <h1>Welcome to Your Todo List App</h1>
                <div className="description">
                    <p>
                        Organize your work, life, and everything in between with
                        our intuitive Todo List App.
                    </p>
                    <p>
                        Stay on top of your tasks, set priorities, and manage
                        your time effectively.
                    </p>
                    <p>
                        Whether you're planning your day, week, or month, we've
                        got you covered.
                    </p>
                </div>
                {/* <div className="center-button-container"> */}
                <button className="make-todo-button-home" onClick={()=>history("/signup")}>
                    Get Started
                </button>
            </div>
            {/* </div> */}
        </div>
    );
}
