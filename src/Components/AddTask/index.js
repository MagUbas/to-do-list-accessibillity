import classes from "./index.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTask(props) {
  const [date, setDate] = useState(props.startingData.date);
  const [task, setTask] = useState(props.startingData.task);

  const handleInputChange = (event) => {
    event.preventDefault();
    setTask(event.target.value);
    props.handleIfTaskIsNew(date, event.target.value);
  };

  const handleDataChange = (event) => {
    event.preventDefault();
    setDate(event);
    props.handleIfTaskIsNew(event, task);
  };
  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  const handleAddtask = () => {
    if (!props.errorAddTask && task !== "") {
      props.handleAddtask(date, task, randomId());
    }
  };

  return (
    <div className={classes.addTask}>
      <DatePicker
        inline
        selected={date}
        onChange={handleDataChange}
        minDate={new Date()}
        todayButton="Today"
        dayClassName={(elem) =>
          elem.toDateString() === date.toDateString()
            ? classes.selected_day
            : null
        }
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
        className={`${classes.addTaskConfirm} ${
          !(!props.errorAddTask && task !== "")
            ? classes.addTaskConfirmDisabled
            : null
        }`}
        onClick={handleAddtask}
        aria-disabled={!(!props.errorAddTask && task !== "")}
      >
        Add new task!
      </button>
    </div>
  );
}

export default AddTask;
