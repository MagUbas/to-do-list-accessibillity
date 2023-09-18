import { useState } from "react";
import classes from "./App.module.css";
import TaskGroup from "./Components/TaskGroup/index";
import { BiPlus } from "react-icons/bi";
import AddTask from "./Components/AddTask/index";
const data = [
  {
    date: new Date().toDateString(),
    taskList: [
      { id: "345zd", text: "test text 5", complate: false },
      { id: "245sd", text: "test text 15", complate: true },
      { id: "345xd", text: "test text 4", complate: false },
    ],
  },
  {
    date: "Sat Sep 16 2023",
    taskList: [{ id: "325sd", text: "test text 7", complate: false }],
  },
];
function App() {
  const [addTaskActive, setAddTaskActive] = useState(false);
  const [taskData, setTaskData] = useState(data);
  const [errorAddTask, setErrorAddTask] = useState(false);

  const handleAddTask = (date, task, id) => {
    let tempTaskData = JSON.parse(JSON.stringify(taskData));
    const findIndex = tempTaskData.findIndex(
      (taskGroup) => taskGroup.date === date.toDateString()
    );
    if (findIndex === -1) {
      tempTaskData.push({
        date: date.toDateString(),
        taskList: [{ id: id, text: task, complate: false }],
      });
      setTaskData(tempTaskData);

      setAddTaskActive(false);
    } else {
      tempTaskData[findIndex].taskList.push({
        id: id,
        text: task,
        complate: false,
      });
      setTaskData(tempTaskData);
      setAddTaskActive(false);
    }
  };
  const handleIfTaskIsNew = (date, task) => {
    let tempTaskData = JSON.parse(JSON.stringify(taskData));
    const findIndex = tempTaskData.findIndex(
      (taskGroup) => taskGroup.date === date.toDateString()
    );
    let ifRepetiveTask;

    if (findIndex === -1) {
      ifRepetiveTask = false;
    } else {
      ifRepetiveTask =
        tempTaskData[findIndex].taskList.findIndex(
          (elem) => elem.text === task
        ) === -1
          ? false
          : true;
    }
    setErrorAddTask(ifRepetiveTask);
  };
  const handleChangeComplate = (date, task) => {
    //find index of date group
    //find index of task in date group
    // delete task
    // change complate task
    // change text inside
    // let tempTaskData = JSON.parse(JSON.stringify(taskData));
    // const findIndex = tempTaskData[
    //   tempTaskData.findIndex(
    //     (taskGroup) => taskGroup.date === date.toDateString()
    //   )
    // ].taskList.findIndex((elem) => elem.text === task);
  };

  return (
    <div className={classes.app}>
      <h1>To Do List</h1>

      {addTaskActive ? (
        <AddTask
          handleAddtask={handleAddTask}
          handleIfTaskIsNew={handleIfTaskIsNew}
          errorAddTask={errorAddTask}
        />
      ) : (
        <>
          <button
            className={classes.appAddTaskButton}
            onClick={() => setAddTaskActive(true)}
          >
            Add a task <BiPlus size={"1rem"} />
          </button>
          <h2>This week</h2>
          {taskData.map((elem) => {
            return (
              <TaskGroup
                key={elem.date}
                date={elem.date}
                taskList={elem.taskList}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
