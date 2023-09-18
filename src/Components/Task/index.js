import classes from "./index.module.css";
import { IconContext } from "react-icons";
import { BiPencil, BiTrash } from "react-icons/bi";

function Task(props) {
  const handleChange = () => {
    props.handleComplateTask(props.id);
  };
  const handleDelete = () => {
    props.handleDeleteTask(props.id);
  };

  return (
    <li
      className={`${classes.task} ${
        props.complate ? classes.taskComplate : null
      }`}
    >
      {/* jak zrobic,zeby wyswietlalo sie na key on title */}

      <label className={classes.taskInputGroup} htmlFor={props.text}>
        <input
          type="checkbox"
          id={props.text}
          checked={props.complate}
          onChange={handleChange}
        ></input>
        {props.text}
      </label>

      <div className={classes.taskButtonGroup}>
        <IconContext.Provider value={{ size: "1.7rem" }}>
          <button title="Edit" onClick={props.handleEdit}>
            <BiPencil />
          </button>
          <button title="Delete" onClick={handleDelete}>
            <BiTrash />
          </button>
        </IconContext.Provider>
      </div>
    </li>
  );
}

export default Task;
