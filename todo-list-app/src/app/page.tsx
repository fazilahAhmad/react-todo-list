"use client";

import { useState, useEffect } from "react";
import { AddTodo } from "./components/AddToDo";
import { ToDoList } from "./components/ToDoList";

interface Todo {
  title: string;
  description: string;
}

const initialTodos: Todo[] = [
  { title: "Buy groceries", description: "Milk, Bread, Eggs, and Fruits" },
  { title: "Workout", description: "1-hour gym session" },
  { title: "Read book", description: "Complete 2 chapters of React guide" },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Load todos from session storage or use initial data
  useEffect(() => {
    const savedTodos = sessionStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      setTodos(initialTodos); // Use initial data if session storage is empty
    }
  }, []);

  // Save todos to session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (todo: Todo) => {
    const todoExists = todos.some(
      (t) => t.title === todo.title && t.description === todo.description
    );

    if (todoExists) {
      alert("This task already exists!");
      return;
    }

    if (editingTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.title === editingTodo.title &&
          t.description === editingTodo.description
            ? todo
            : t
        )
      );
      setEditingTodo(null);
    } else {
      setTodos((prevTodos) => [...prevTodos, todo]);
    }
    setShowForm(false);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleAddButtonClick = () => {
    setEditingTodo(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTodo(null); // Reset the form state
    setShowForm(false); // Hide the form
  };

  return (
    <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen px-4 py-8 md:p-10 pb-20 gap-8 bg-gradient-to-r from-blue-200 via-purple-100 to-pink-100">
      <main className="w-full bg-yellow-50 max-w-2xl p-6 md:p-8 row-start-1 grid items-center justify-items-center rounded">
        <h1 className="text-3xl mb-3">TODO LIST</h1>
        {!showForm ? (
          <div className="w-full grid">
            <button
              onClick={handleAddButtonClick}
              className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 md:py-2 md:px-4 rounded transition justify-self-end"
            >
              Add a new to-do
            </button>
          </div>
        ) : (
          <AddTodo
            onAdd={handleAddTodo}
            editingTodo={editingTodo}
            onCancel={handleCancel}
          />
        )}
        {todos.length > 0 && <ToDoList todos={todos} onEdit={handleEditTodo} />}
      </main>
      <footer className="row-start-2 flex gap-6 flex-wrap items-center justify-center">
        Created by Nurfazilah Binti Ahmad
      </footer>
    </div>
  );
}
