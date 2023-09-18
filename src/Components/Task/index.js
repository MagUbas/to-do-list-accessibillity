import classes from "./index.module.css";
import { IconContext } from "react-icons";
import { BiPencil, BiTrash } from "react-icons/bi";

function Task(props) {
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
          onChange={props.handleChangeComplate(props.text)}
        ></input>
        {props.text}
      </label>

      <div className={classes.taskButtonGroup}>
        <IconContext.Provider value={{ size: "1.7rem" }}>
          <button title="Edit" onClick={props.handleEdit}>
            <BiPencil />
          </button>
          <button title="Delete" onClick={props.handleDelete}>
            <BiTrash />
          </button>
        </IconContext.Provider>
      </div>
    </li>
  );
}

export default Task;
