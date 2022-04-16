import {
  DELETE_TASK,
  SET_NEW_TASK,
  SET_TASKS,
  DONE_TASK,
} from "./../actions/tasksListActions";
import { SET_FETCHING, TActionTypes } from "../actions/tasksListActions";

type TTasksListParents = {
  id: string;
  text: string | null;
};

type TInitialState = {
  isFetching: boolean;
  tasksList: TTasksList | null;
  tasksListParents: TTasksListParents[] | null;
};

const initialState: TInitialState = {
  isFetching: false,
  tasksList: null,
  tasksListParents: null,
};

export const tasksListReducer = (
  state = initialState,
  action: TActionTypes
) => {
  switch (action.type) {
    case SET_FETCHING: {
      const isFetching = action.isFetching;
      return {
        ...state,
        isFetching,
      };
    }
    case SET_TASKS: {
      const tasksList = action.tasksList;

      return {
        ...state,
        tasksList,
      };
    }
    case SET_NEW_TASK: {
      const parentId = action.parent;
      const text = action.text;
      const newTaskList = state.tasksList;
      if (parentId === "-1") {
        newTaskList?.push({
          id: String(Math.random() * 100),
          text,
          isDone: false,
          children: [],
        });
      }
      newTaskList?.forEach((task) => {
        if (task.id === parentId) {
          task &&
            task.children &&
            task.children.push({
              id: String(Math.random() * 100),
              text,
              isDone: false,
              children: [],
            });
        }
        task.children?.forEach((el) => {
          if (el.id === parentId) {
            el &&
              el.children &&
              el.children.push({
                id: String(Math.random() * 100),
                text,
                isDone: false,
                children: [],
              });
          }
        });
      });
      return {
        ...state,
        tasksList: newTaskList,
      };
    }
    case DELETE_TASK: {
      const taskId = action.taskId;
      let newTasksList = state.tasksList;

      newTasksList &&
        newTasksList.forEach((task) => {
          if (task.id === taskId) {
            newTasksList =
              newTasksList && newTasksList.filter((el) => el.id !== taskId);
          }
          task.children &&
            task.children.forEach((task2) => {
              if (task2.id === taskId) {
                task.children = task.children.filter((el) => el.id !== taskId);
              }
              task2.children?.forEach((task3) => {
                if (task3.id === taskId) {
                  task2.children = task2.children.filter(
                    (el) => el.id !== taskId
                  );
                }
              });
            });
        });
      return {
        ...state,
        tasksList: [...(newTasksList || [])],
      };
    }
    case DONE_TASK: {
      const taskId = action.taskId;
      let newTasksList = state.tasksList;
      if (newTasksList) {
        for (const task of newTasksList) {
          if (task.id === taskId) {
            task.isDone = !task.isDone;
            newTasksList?.sort((a, b) => Number(a.isDone) - Number(b.isDone));
            break;
          }
          for (const task2 of task.children) {
            if (task2.id === taskId) {
              task2.isDone = !task2.isDone;
              task.children?.sort(
                (a, b) => Number(a.isDone) - Number(b.isDone)
              );
              break;
            }
            for (const task3 of task2.children) {
              if (task3.id === taskId) {
                task3.isDone = !task3.isDone;
                task2.children?.sort(
                  (a, b) => Number(a.isDone) - Number(b.isDone)
                );
                break;
              }
            }
          }
        }
      }

      return {
        ...state,
        tasksList: [...(newTasksList || [])],
      };
    }
    default:
      return state;
  }
};
