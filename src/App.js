import "./App.css";
import TaskGroup from "./Components/TaskGroup/index";

function App() {
  const taskData = [
    {
      date: "2023-09-14",
      taskList: [
        { text: "test text 5", complate: false },
        { text: "test text 15", complate: true },
        { text: "test text 5", complate: false },
      ],
    },
    {
      date: "2023-09-15",
      taskList: [{ text: "test text 7", complate: false }],
    },
  ];

  return (
    <div className="App">
      <h1>To Do List</h1>
      <h2>This week</h2>
      <button>Add a task</button>
      {taskData.map((elem) => {
        return (
          <TaskGroup
            key={elem.date}
            date={elem.date}
            taskList={elem.taskList}
          />
        );
      })}
    </div>
  );
}

export default App;
