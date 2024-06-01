import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai"; // Import icons
import "./Todo.css"; // Import the corresponding CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    const fetchdata = async () => {
        const user = sessionStorage.getItem("id");
        if (user) {
            await axios
                .get(`https://todo-backend-param.onrender.com/api/v2/getTasks/${user}`)
                .then((res) => {
                    setTodos(res.data.lists);
                });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = sessionStorage.getItem("id");
        if (!title.trim()) {
            toast("Please fill the title", {
                autoClose: 1000,
                type: "error",
                pauseOnHover: false,
            });
            return;
        }

        if (isEditing) {
            setTodos(
                todos.map((todo) =>
                    todo._id === currentTodo._id
                        ? { ...todo, title, body }
                        : todo
                )
            );
            const user = sessionStorage.getItem("id");
            if (user) {
                await axios
                    .put(
                        `https://todo-backend-param.onrender.com/api/v2/updateTask/${currentTodo._id}`,
                        { title, body, id: user }
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            fetchdata(); // Fetch updated data
                            toast("Todo updated Successfully", {
                                autoClose: 1000,
                                type: "success",
                                pauseOnHover: false,
                            });
                        }
                    });
            }
            setIsEditing(false);
            setCurrentTodo(null);
        } else {
            if (user) {
                await axios
                    .post("https://todo-backend-param.onrender.com/api/v2/addTask", {
                        title: title,
                        body: body,
                        id: user,
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            toast("Todo added Successfully", {
                                autoClose: 1000,
                                type: "success",
                                pauseOnHover: false,
                            });
                            fetchdata(); // Fetch updated data
                        }
                    });
            } else {
                toast("Todo added Successfully", {
                    autoClose: 1500,
                    type: "success",
                    pauseOnHover: false,
                });
                toast("Your task is not saved! Please LogIn", {
                    autoClose: 1500,
                    type: "error",
                    pauseOnHover: false,
                });
                const newTodo = {
                    _id: Date.now(),
                    title: title,
                    body: body,
                };
                setTodos([newTodo, ...todos]);
            }
        }

        setTitle("");
        setBody("");
    };

    const handleComplete = async (id) => {
        setTodos(todos.filter((todo) => todo._id !== id));
        const user = sessionStorage.getItem("id");
        if (user) {
            await axios.delete(
                `https://todo-backend-param.onrender.com/api/v2/deleteTask/${id}`,
                {
                    data: { user: user },
                }
            );
        }
    };

    const handleEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo(todo);
        setTitle(todo.title);
        setBody(todo.body);
    };

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div className="todo">
            <ToastContainer />
            <div className="add-todo">
                <h2>{isEditing ? "Edit Todo" : "Add Todo"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        className="text-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Body"
                        className="text-input"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <button type="submit" className="make-todo-button">
                        {isEditing ? "Update Todo" : "Add Todo"}
                    </button>
                </form>
            </div>
            <div className="todo-list">
                <h2>Todo List</h2>
                {todos.length === 0 ? (
                    <p className="no-todos">No todos yet. Add some todos!</p>
                ) : (
                    <ul>
                        {todos.map((todo, index) => (
                            <li
                                key={index}
                                className={`todo-item ${
                                    todo.completed ? "completed" : ""
                                }`}
                            >
                                <div className="todo-content">
                                    <div className="todo-details">
                                        <h3>{todo.title}</h3>
                                        <p>{todo.body}</p>
                                    </div>
                                    <div className="todo-actions">
                                        <button
                                            className="action-button complete-button"
                                            onClick={() =>
                                                handleComplete(todo._id)
                                            }
                                            title="Complete"
                                        >
                                            <AiOutlineCheckCircle />
                                        </button>
                                        <button
                                            className="action-button update-button"
                                            onClick={() => handleEdit(todo)}
                                            title="Edit"
                                        >
                                            <AiOutlineEdit />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
