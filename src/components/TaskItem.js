import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "TASK";

function TaskItem({ task, index, toggleComplete, deleteTask, editTask, moveTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
      if (item.index !== index) {
        moveTask(item.index, index);
        item.index = index;
      }
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`card mb-3 ${task.completed ? "bg-success-subtle" : ""} ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        {isEditing ? (
          <div className="flex-grow-1">
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="form-control mb-2"
            />
            <textarea
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              className="form-control mb-2"
              rows="3"
            />
            <input
              type="date"
              value={editedTask.dueDate}
              onChange={(e) =>
                setEditedTask({ ...editedTask, dueDate: e.target.value })
              }
              className="form-control mb-2"
            />
            <select
              value={editedTask.priority}
              onChange={(e) =>
                setEditedTask({ ...editedTask, priority: e.target.value })
              }
              className="form-select mb-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button
              onClick={handleSave}
              className="btn btn-success me-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex-grow-1">
            <h5
              className={`card-title ${
                task.completed ? "text-decoration-line-through text-muted" : ""
              }`}
            >
              {task.title}
            </h5>
            <p className="card-text">{task.description}</p>
            <p className="card-text">
              <small className="text-muted">Due: {task.dueDate}</small>
            </p>
            <p className="card-text">
              <small
                className={
                  task.priority === "High"
                    ? "text-danger"
                    : task.priority === "Medium"
                    ? "text-warning"
                    : "text-success"
                }
              >
                Priority: {task.priority}
              </small>
            </p>
          </div>
        )}
        <div className="d-flex gap-2">
          {!isEditing && (
            <>
              <button
                onClick={() => toggleComplete(task.id)}
                className={`btn ${
                  task.completed ? "btn-warning" : "btn-success"
                }`}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={handleEdit}
                className="btn btn-primary"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;