import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
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
  ],
};

const findTask = (id, state) => {
  let indexOfDate = -1;
  let indexOfTask = -1;
  state.forEach((taskGroup, index) => {
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

export const toDoListSlice = createSlice({
  name: "toDoListSlice",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.data = action.payload;
    },
    addTask: (state, action) => {
      let tempTaskData = JSON.parse(JSON.stringify(state.data));
      const index = tempTaskData.findIndex(
        (elem) => elem.date === action.payload.date
      );
      if (index === -1) {
        tempTaskData.push({
          date: action.payload.date,
          taskList: [
            {
              id: action.payload.id,
              text: action.payload.task,
              complate: false,
            },
          ],
        });
      } else {
        tempTaskData[index].taskList.push({
          id: action.payload.id,
          text: action.payload.task,
          complate: false,
        });
      }
      state.data = tempTaskData;
    },
    complateTask: (state, action) => {
      let tempTaskData = JSON.parse(JSON.stringify(state.data));
      const index = findTask(action.payload, tempTaskData);
      let task = tempTaskData[index.indexOfDate].taskList[index.indexOfTask];
      task.complate = !task.complate;
      if (task.complate) {
        if (
          index.indexOfTask + 1 <
          tempTaskData[index.indexOfDate].taskList.length
        ) {
          if (
            !tempTaskData[index.indexOfDate].taskList[index.indexOfTask + 1]
              .complate
          ) {
            tempTaskData[index.indexOfDate].taskList.splice(
              index.indexOfTask,
              1
            );
            tempTaskData[index.indexOfDate].taskList.push(task);
          }
        }
      } else {
        if (index.indexOfTask - 1 >= 0) {
          if (
            tempTaskData[index.indexOfDate].taskList[index.indexOfTask - 1]
              .complate
          ) {
            tempTaskData[index.indexOfDate].taskList.splice(
              index.indexOfTask,
              1
            );
            tempTaskData[index.indexOfDate].taskList.unshift(task);
          }
        }
      }

      tempTaskData[index.indexOfDate].complate =
        tempTaskData[index.indexOfDate].taskList[0].complate;
      state.data = tempTaskData;
    },
    deleteTask: (state, action) => {
      let tempTaskData = JSON.parse(JSON.stringify(state.data));
      const index = findTask(action.payload, tempTaskData);
      tempTaskData[index.indexOfDate].taskList.splice(index.indexOfTask, 1);
      if (tempTaskData[index.indexOfDate].taskList.length === 0) {
        tempTaskData.splice(index.indexOfDate, 1);
      }
      state.data = tempTaskData;
    },
  },
});

export const { addTask, setState, complateTask, deleteTask } =
  toDoListSlice.actions;

export default toDoListSlice.reducer;
