"use client";

import React, { useState, useEffect } from "react";

interface Todo {
  title: string;
  description: string;
}

interface AddTodoProps {
  onAdd: (todo: Todo) => void;
  editingTodo: Todo | null;
  onCancel: () => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({
  onAdd,
  editingTodo,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTodo]);

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      alert("Both title and description are required.");
      return;
    }

    onAdd({ title, description });

    setTitle("");
    setDescription("");
  };

  const handleCancel = () => {
    // Reset form and stop editing by clearing the fields
    setTitle("");
    setDescription("");
    onCancel(); // Notify parent component to stop editing
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded shadow-md mt-4">
        <h2 className="text-xl font-semibold mb-4">
          {editingTodo ? "Edit Todo" : "Add Todo"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              rows={2}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            >
              {editingTodo ? "Update" : "Add"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
