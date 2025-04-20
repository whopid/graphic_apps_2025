import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo } from "./todoSlice";
import { setFilter } from "./filterSlice";
import { format, differenceInDays, parseISO } from "date-fns";

const Todo = () => {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);

  const groupedTodos = todos.reduce((acc, todo) => {
    const dateKey = format(parseISO(todo.createdAt), "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(todo);
    return acc;
  }, {});

  const filteredTodos = Object.entries(groupedTodos).reduce((acc, [date, items]) => {
    const filteredItems = items.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "active") return !todo.completed;
      return true;
    });

    if (filteredItems.length > 0) {
      acc[date] = filteredItems;
    }
    return acc;
  }, {});

  const getDeadlineColor = (deadlineDate) => {
    if (!deadlineDate) return "inherit";
    const today = new Date();
    const daysLeft = differenceInDays(parseISO(deadlineDate), today);
    
    if (daysLeft < 0) return "#ff4444";
    if (daysLeft <= 1) return "#ffd700";
    return "#2ecc71";
  };

  return (
    <div className="todo-container">
      <div className="filters">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter("active"))}
          className={filter === "active" ? "active" : ""}
        >
          Active
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      <div className="add-todo">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button
          onClick={() => {
            if (text.trim()) {
              dispatch(addTodo({ text, deadline }));
              setText("");
              setDeadline("");
            }
          }}
        >
          Add Task
        </button>
      </div>

      {Object.entries(filteredTodos).map(([date, todos]) => (
        <div key={date} className="todo-group">
          <h3>{format(parseISO(date), "eeee, MMMM do")}</h3>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleComplete(todo.id))}
                />

                <div className="todo-content">
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: !todo.completed
                        ? getDeadlineColor(todo.deadline)
                        : "#95a5a6",
                    }}
                  >
                    {todo.text}
                    {todo.deadline && !todo.completed && (
                      <span className="deadline">
                        (Due: {format(parseISO(todo.deadline), "MMM dd, HH:mm")})
                      </span>
                    )}
                  </span>

                  {todo.completed && (
                    <span className="completed-at">
                      Completed at: {format(parseISO(todo.completedAt), "MMM dd, HH:mm")}
                    </span>
                  )}

                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Todo;