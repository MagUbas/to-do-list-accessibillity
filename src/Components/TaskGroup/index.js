import Task from "../Task/index";
import classes from "./index.module.css";

function TaskGroup(props) {
  const handleComplateTask = (id) => {
    props.handleComplateTask(id);
  };
  const handleDeleteTask = (id) => {
    props.handleDeleteTask(id);
  };
  const handleEditTask = (id) => {
    props.handleEditTask(id);
  };

  const dateFormat = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(props.date);
    const nth = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    return `${weekday[date.getDay()]} ${date.getDate()}${nth(date.getDate())} ${
      month[date.getMonth()]
    }`;
  };

  return (
    <div
      className={`${classes.taskGroup} ${
        props.complate ? classes.taskGroupComplate : null
      }`}
    >
      <h3>{dateFormat()}</h3>
      <ul className={classes.taskList}>
        {props.taskList.map((elem) => {
          return (
            <Task
              key={elem.id}
              id={elem.id}
              text={elem.text}
              complate={elem.complate}
              handleComplateTask={handleComplateTask}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TaskGroup;
