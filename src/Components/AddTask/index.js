import classes from "./index.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTask(props) {
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState("");

  const handleInputChange = (event) => {
    setTask(event.target.value);
    props.handleIfTaskIsNew(date, event.target.value);
  };

  const handleDataChange = (event) => {
    setDate(event);
    props.handleIfTaskIsNew(event, task);
  };
  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  return (
    <div className={classes.addTask}>
      <DatePicker
        inline
        selected={date}
        onChange={handleDataChange}
        minDate={new Date()}
        todayButton="Today"
      />
      <label className={classes.addTaskLabel}>
        What's on your mind?
        <textarea
          id="task"
          name="task"
          value={task}
          onChange={handleInputChange}
          className={classes.addTaskInput}
        />
      </label>

      <p className={classes.addTaskError}>
        {props.errorAddTask ? "This task is already on your list" : " "}
      </p>

      <button
        className={classes.addTaskConfirm}
        onClick={() => props.handleAddtask(date, task, randomId())}
        disabled={props.errorAddTask}
      >
        Add new task!
      </button>
    </div>
  );
}

export default AddTask;