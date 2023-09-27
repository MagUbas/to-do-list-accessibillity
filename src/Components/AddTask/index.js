import classes from "./index.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTask(props) {
  const [date, setDate] = useState(props.startingData.date);
  const [task, setTask] = useState(props.startingData.task);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const taskData = useSelector((state) => state.toDoList.data);

  const handleIfTaskIsNew = (value, date) => {
    let newError = "";
    const findIndex = taskData.findIndex(
      (taskGroup) => taskGroup.date === date.toDateString()
    );

    if (findIndex >= 0) {
      if (
        taskData[findIndex].taskList.findIndex((elem) => elem.text === value) >=
        0
      ) {
        newError = "This task is already on your list";
      }
    }
    return newError;
  };

  const handleInputChange = (event) => {
    let newError = handleIfTaskIsNew(event.target.value, date);
    setError(newError);

    if (event.target.value.length >= 30) {
      setInfo("This task have the maximum length");
    } else {
      setInfo("");
    }

    setTask(event.target.value);
  };

  const handleDataChange = (event) => {
    setError(handleIfTaskIsNew(task, event));
    setDate(event);
  };
  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  const handleAddtask = () => {
    if (error === "" && task !== "") {
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
        dayClassName={(elem) => {
          return elem.toDateString() === date.toDateString()
            ? classes.selected_day
            : elem.getDate() === date.getDate() && elem > date
            ? classes.day
            : null;
        }}
      />
      <label className={classes.addTaskLabel}>
        What's on your mind?
        <textarea
          id="task"
          name="task"
          value={task}
          maxLength="30"
          onChange={handleInputChange}
          className={classes.addTaskInput}
        />
      </label>

      <p className={classes.addTaskError}>{error === "" ? info : error}</p>

      <button
        className={`${classes.addTaskConfirm} ${
          !(error === "" && task !== "") ? classes.addTaskConfirmDisabled : null
        }`}
        onClick={handleAddtask}
        aria-disabled={error !== "" || task === ""}
      >
        Add new task!
      </button>
    </div>
  );
}

export default AddTask;
