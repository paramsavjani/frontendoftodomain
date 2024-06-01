import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai"; // Import icons
import "./Todo.css"; // Import the corresponding CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast("Please fill the title", {
                autoClose: 1500,
                position: "top-right",
                type: "error",
                pauseOnHover: false,
            });
            return;
        }

        if (isEditing) {
            toast("Todo updated Successfully", {
                autoClose: 1000,
                position: "top-right",
                type: "success",
                pauseOnHover: false,
            });
            setTodos(
                todos.map((todo) =>
                    todo.id === currentTodo.id ? { ...todo, title, body } : todo
                )
            );
            setIsEditing(false);
            setCurrentTodo(null);
        } else {
            toast("Todo added Successfully", {
                autoClose: 1000,
                position: "top-right",
                type: "success",
                pauseOnHover: false,
            });
            const newTodo = { id: Date.now(), title, body, completed: false };
            setTodos([...todos, newTodo]);
        }

        setTitle("");
        setBody("");
    };

    const handleComplete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo(todo);
        setTitle(todo.title);
        setBody(todo.body);
    };

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
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
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
                                                handleComplete(todo.id)
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
