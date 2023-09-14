function Task(props) {
  return <li disabled={props.complate}>{props.text}</li>;
}

export default Task;
