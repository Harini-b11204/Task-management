import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    addTask({ title, description, dueDate, priority });
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Low");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mb-4">
      <div className="bg-primary">
        <div className="col-md-6" >
          <label htmlFor="title" className="form-label" style={{display:'initial',padding:'15px'}}>
            Title
          </label>
          <input style={{marginTop:'10px'}}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="dueDate" className="form-label" style={{marginTop:'10px',display:'initial',padding:'15px'}}>
            Due Date
          </label>
          <input style={{marginTop:'10px'}}
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control"
            required
          />
        </div>
      </div>
      <div className="mb-3 mt-3">
        <label htmlFor="description" className="form-label" style={{display:'initial',padding:'15px'}}>
          Description
        </label>
        <textarea style={{marginTop:'10px'}}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          rows="3"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="priority" className="form-label" style={{display:'initial',padding:'15px'}}>
          Priority
        </label>
        <select style={{marginTop:'10px'}}
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="form-select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-100 " style={{display:'flex',padding:'5px',margin:'20px'}}>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;