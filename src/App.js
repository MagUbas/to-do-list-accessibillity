import { useState, useEffect } from "react";
import classes from "./App.module.css";
import TaskGroup from "./Components/TaskGroup/index";
import { BiPlus } from "react-icons/bi";
import AddTask from "./Components/AddTask/index";
import {
  setState,
  addTask,
  complateTask,
  deleteTask,
} from "./redux/features/toDoList/toDoListSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const taskData = useSelector((state) => state.toDoList.data);
  const dispatch = useDispatch();

  const [addTaskActive, setAddTaskActive] = useState(false);
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
    //setTaskData(tempTaskData);
    dispatch(setState(tempTaskData));
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
    //setTaskData(tempTaskData);
    dispatch(setState(tempTaskData));
  }, []);

  const handleAddTask = (date, task, id) => {
    dispatch(addTask({ date: date.toDateString(), task, id }));
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
    dispatch(complateTask(id));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEditTask = (id) => {
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

    setStartingData({
      date: new Date(taskData[indexOfDate].date),
      task: taskData[indexOfDate].taskList[indexOfTask].text,
    });
    setAddTaskActive(true);
    dispatch(deleteTask(id));
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
