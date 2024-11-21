import { FaEdit } from "react-icons/fa";

interface Todo {
  title: string;
  description: string;
}

interface ToDoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
}

export const ToDoList: React.FC<ToDoListProps> = ({ todos, onEdit }) => {
  return (
    <div className="w-full py-4">
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="w-full border rounded shadow-lg p-2 my-2 bg-green-300"
          >
            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="leading-tight font-medium">{todo.title}</div>
                <div className="leading-tight text-sm text-gray-600">
                  {todo.description}
                </div>
              </div>
              <button onClick={() => onEdit(todo)} className="p-2">
                <FaEdit className="h-5 w-5 text-yellow-500 hover:text-orange-800" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
