import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import TaskListReducer from './TaskListReducer';
import AddTaskReducer from './AddTaskReducer';

export default combineReducers({
  auth: AuthReducer,
  taskList: TaskListReducer,
  addTask :AddTaskReducer
});
