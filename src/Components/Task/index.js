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
  const handleEdit = () => {
    console.log(props.complate);
    if (!props.complate) {
      props.handleEditTask(props.id);
    }
  };

  return (
    <li
      className={`${classes.task} ${
        props.complate ? classes.taskComplate : null
      }`}
    >
      <label className={classes.taskInputGroup} htmlFor={props.text}>
        <input
          type="checkbox"
          id={props.text}
          aria-checked={props.complate}
          onChange={handleChange}
        ></input>
        {props.text}
      </label>

      <div className={classes.taskButtonGroup}>
        <IconContext.Provider value={{ size: "1.7rem" }}>
          <button
            title="Edit"
            onClick={handleEdit}
            aria-disabled={props.complate}
            className={`${props.complate ? classes.buttonDisabled : null}`}
          >
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
