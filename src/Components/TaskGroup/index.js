import Task from "../Task/index";
import classes from "./index.module.css";

function TaskGroup(props) {
  const handleChangeComplate = (text) => {
    console.log("change");
    // props.handleChangeComplate(props.date, text);
  };
  return (
    <div className={classes.taskGroup}>
      <h3>{props.date}</h3>
      <ul className={classes.taskList}>
        {props.taskList.map((elem) => {
          return (
            <Task
              key={elem.id}
              text={elem.text}
              complate={elem.complate}
              handleChangeComplate={handleChangeComplate}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TaskGroup;
