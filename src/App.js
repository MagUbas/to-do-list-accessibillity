import { useState, useEffect } from "react";
import classes from "./App.module.css";
import TaskGroup from "./Components/TaskGroup/index";
import { BiPlus } from "react-icons/bi";
import AddTask from "./Components/AddTask/index";
const data = [
  {
    date: "Fri Sep 22 2023",
    taskList: [
      { id: "345zd", text: "Test text 5", complate: false },
      { id: "245sd", text: "Test text 15", complate: true },
      { id: "345xd", text: "Test text 4", complate: false },
    ],
    complate: false,
  },
  {
    date: "Wed Sep 13 2023",
    taskList: [{ id: "325sd", text: "Test text 7", complate: false }],
    complate: false,
  },
];
function App() {
  // const [loading, setLoading] = useState(false);
  const [addTaskActive, setAddTaskActive] = useState(false);
  const [taskData, setTaskData] = useState(data);
  const [errorAddTask, setErrorAddTask] = useState(false);
  const [startingData, setStartingData] = useState({
    date: new Date(),
    task: "",
  });

  useEffect(() => {
    let tempTaskData = JSON.parse(JSON.stringify(taskData));
    tempTaskData.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setTaskData(tempTaskData);
  }, [taskData.length]);

  useEffect(() => {
    let tempTaskData = JSON.parse(JSON.stringify(taskData));
    tempTaskData.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    tempTaskData.forEach((TaskGroup) => {
      TaskGroup.taskList.sort((a, b) => {
        return a.complate ? 1 : -1;
      });

      if (new Date(TaskGroup.date) < new Date()) {
        TaskGroup.complate = true;
        TaskGroup.taskList.forEach((task) => {
          task.complate = true;
        });
      }
    });
    setTaskData(tempTaskData);
  }, []);

  const findTask = (id) => {
    let indexOfDate = -1;
    let indexOfTask = -1;
    taskData.forEach((taskGroup, index) => {
      const tempIndexOfTask = taskGroup.taskList.findIndex(
        (task) => task.id === id
      );
      if (tempIndexOfTask !== -1) {
        indexOfTask = tempIndexOfTask;
        indexOfDate = index;
      }
    });
    return { indexOfDate: indexOfDate, indexOfTask: indexOfTask };
  };

  const handleAddTask = (date, task, id) => {
    let tempTaskData = JSON.parse(JSON.stringify(taskData));
    const index = tempTaskData.findIndex(
      (elem) => elem.date === date.toDateString()
    );
    if (index === -1) {
      tempTaskData.push({
        date: date.toDateString(),
        taskList: [{ id: id, text: task, complate: false }],
      });
    } else {
      tempTaskData[index].taskList.push({
        id: id,
        text: task,
        complate: false,
      });
    }
    setTaskData(tempTaskData);
    setAddTaskActive(false);
    setStartingData({
      date: new Date(),
      task: "",
    });
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

  const handleComplateTask = (id) => {
    const index = findTask(id);
    let tempTaskData = JSON.parse(JSON.stringify(taskData));
    let task = tempTaskData[index.indexOfDate].taskList[index.indexOfTask];
    task.complate = !task.complate;

    tempTaskData[index.indexOfDate].taskList.splice(index.indexOfTask, 1);
    if (task.complate) {
      tempTaskData[index.indexOfDate].taskList.push(task);
    } else {
      tempTaskData[index.indexOfDate].taskList.unshift(task);
    }
    tempTaskData[index.indexOfDate].complate =
      tempTaskData[index.indexOfDate].taskList[0].complate;
    setTaskData(tempTaskData);
  };

  const handleDeleteTask = (id) => {
    const index = findTask(id);
    let tempTaskData = JSON.parse(JSON.stringify(taskData));
    tempTaskData[index.indexOfDate].taskList.splice(index.indexOfTask, 1);
    setTaskData(tempTaskData);
  };

  const handleEditTask = (id) => {
    const index = findTask(id);
    let tempTaskData = JSON.parse(JSON.stringify(taskData));

    setStartingData({
      date: new Date(tempTaskData[index.indexOfDate].date),
      task: tempTaskData[index.indexOfDate].taskList[index.indexOfTask].text,
    });
    setAddTaskActive(true);
    handleDeleteTask(id);
  };

  return (
    <div className={classes.app}>
      <h1>To Do List</h1>

      {addTaskActive ? (
        <AddTask
          startingData={startingData}
          handleAddtask={handleAddTask}
          handleIfTaskIsNew={handleIfTaskIsNew}
          errorAddTask={errorAddTask}
          handleClose={() => setAddTaskActive(false)}
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
                handleComplateTask={handleComplateTask}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
                key={elem.date}
                date={elem.date}
                complate={elem.complate}
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
