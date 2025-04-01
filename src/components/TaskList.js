import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleComplete, deleteTask, editTask, moveTask }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-muted">No tasks available.</p>
      ) : (
        tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            editTask={editTask}
            moveTask={moveTask}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;