import Task from "../Task/index";
import classes from "./index.module.css";

function TaskGroup(props) {
  return (
    <div className={classes.taskGroup}>
      <h3>{props.date}</h3>
      <ul className={classes.taskList}>
        {props.taskList.map((elem) => {
          return (
            <Task key={elem.text} text={elem.text} complate={elem.complate} />
          );
        })}
      </ul>
    </div>
  );
}

export default TaskGroup;
