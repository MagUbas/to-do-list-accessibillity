import Task from "../Task/index";

function TaskGroup(props) {
  return (
    <div>
      <h3>{props.date}</h3>
      <ul>
        {/* component Task*/}
        <Task />
        <li>Task 2 Complete</li>
        <li>Task 3</li>
      </ul>
    </div>
  );
}

export default TaskGroup;
