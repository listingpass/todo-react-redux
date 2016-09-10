import { Record } from 'immutable';


export const Task = new Record({
  date: null,
  completed: false,
  key: null,
  employee:null,
  job:null,
  service:null,
  time: 0,
  note: null,
  approved:false,
  approvedBy:null,
  needsReview:false,
  createdBy:null,
  title: null
});
