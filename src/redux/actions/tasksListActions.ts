import { ApiTasks } from "./../../API/tasksListApi";
export const SET_FETCHING = "SET_FETCHING";
export const SET_TASKS = "SET_TASKS";
export const SET_NEW_TASK = "SET_NEW_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const DONE_TASK = "DONE_TASK";

type TSetFetching = {
  type: typeof SET_FETCHING;
  isFetching: boolean;
};

export const setFetching = (isFetching: boolean): TSetFetching => ({
  type: SET_FETCHING,
  isFetching,
});

type TSetTasks = {
  type: typeof SET_TASKS;
  tasksList: TTasksList;
};

export const setTasks = (tasksList: TTasksList): TSetTasks => ({
  type: SET_TASKS,
  tasksList,
});

type TSetNewTask = {
  type: typeof SET_NEW_TASK;
  parent: string;
  text: string;
};

export const setNewtask = (parent: string, text: string): TSetNewTask => ({
  type: SET_NEW_TASK,
  parent,
  text,
});

type TDeleteTask = {
  type: typeof DELETE_TASK;
  taskId: string;
};

export const deleteTask = (taskId: string): TDeleteTask => ({
  type: DELETE_TASK,
  taskId,
});

type TDoneTask = {
  type: typeof DONE_TASK;
  taskId: string;
};

export const doneTask = (taskId: string): TDoneTask => ({
  type: DONE_TASK,
  taskId,
});

export type TActionTypes =
  | TSetFetching
  | TSetTasks
  | TSetNewTask
  | TDeleteTask
  | TDoneTask;

export const getTasksListThunk = () => async (dispatch: any) => {
  try {
    dispatch(setFetching(true));
    let response = await ApiTasks.getTasksList();
    dispatch(setFetching(false));
    dispatch(setTasks(response));
  } catch (e) {
    console.log("Error", e);
    dispatch(setFetching(false));
  }
};
