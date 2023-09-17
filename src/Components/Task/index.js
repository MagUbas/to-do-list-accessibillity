import classes from "./index.module.css";
import { IconContext } from "react-icons";
import { BiPencil, BiTrash } from "react-icons/bi";

function Task(props) {
  return (
    <li className={classes.task} disabled={props.complate}>
      {/* jak zrobic,zeby wyswietlalo sie na key on title */}
      {/* <div className={classes.taskInputGroup}>
       
        <label for={props.text}>{props.text}</label>
      </div> */}
      <label className={classes.taskInputGroup} htmlFor={props.text}>
        <input type="checkbox" id={props.text}></input>
        <span className={classes.taskInputGroupCheckmark}></span>

        {props.text}
      </label>

      <div className={classes.taskButtonGroup}>
        <IconContext.Provider value={{ color: "white", size: "1.7rem" }}>
          <button title="Edit">
            <BiPencil />
          </button>
          <button title="Delete">
            <BiTrash />
          </button>
        </IconContext.Provider>
      </div>
    </li>
  );
}

export default Task;
