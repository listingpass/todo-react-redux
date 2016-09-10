import { getDeletedTask } from './selectors';
import { taskList } from './task-list';
import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  FILTER_TASKS,
  LOAD_TASKS_SUCCESS,
  UNDELETE_TASK_ERROR,
  UNLOAD_TASKS_SUCCESS,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS
} from './action-types';


export function createTask(employee, job, service, time, note) {
  return dispatch => {
    taskList.push({ employee: employee, job: job, service: service,  time: time,  note: note, completed: false, approved: false })
      .catch(error => dispatch(createTaskError(error)));
  };
}

export function createTaskError(error) {
  return {
    type: CREATE_TASK_ERROR,
    payload: error
  };
}

export function createTaskSuccess(task) {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: task
  };
}

export function deleteTask(task) {
  return dispatch => {
    taskList.remove(task.key)
      .catch(error => dispatch(deleteTaskError(error)));
  };
}

export function deleteTaskError(error) {
  return {
    type: DELETE_TASK_ERROR,
    payload: error
  };
}

export function deleteTaskSuccess(task) {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: task
  };
}

export function undeleteTask() {
  return (dispatch, getState) => {
    const task = getDeletedTask(getState());
    if (task) {
      taskList.set( task.key, {completed: task.completed, time: task.time, employee:task.employee, service:task.service, job:task.job, note: task.note, approved: task.approved })
        .catch(error => dispatch(undeleteTaskError(error)));
    }
  };
}

export function undeleteTaskError(error) {
  return {
    type: UNDELETE_TASK_ERROR,
    payload: error
  };
}

export function updateTaskError(error) {
  return {
    type: UPDATE_TASK_ERROR,
    payload: error
  };
}

export function updateTask(task, changes) {
  return dispatch => {
    taskList.update(task.key, changes)
      .catch(error => dispatch(updateTaskError(error)));
  };
}

export function updateTaskSuccess(task) {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: task
  };
}

export function loadTasksSuccess(tasks) {
  return {
    type: LOAD_TASKS_SUCCESS,
    payload: tasks
  };
}

export function filterTasks(filterType) {
  return {
    type: FILTER_TASKS,
    payload: {filterType}
  };
}

export function loadTasks() {
  return (dispatch, getState) => {
    const { auth } = getState();
    taskList.path = `tasks/${auth.id}`;
    taskList.subscribe(dispatch);
  };
}

export function unloadTasks() {
  taskList.unsubscribe();
  return {
    type: UNLOAD_TASKS_SUCCESS
  };
}
