import Task from "../Task/index";

function TaskGroup(props) {
  return (
    <div>
      <h3>{props.date}</h3>
      <ul>
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
