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
  return (
    <div
      className={`${classes.taskGroup} ${
        props.complate ? classes.taskGroupComplate : null
      }`}
    >
      <h3>{props.date}</h3>
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
