import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Task } from 'src/core/tasks';
class TaskItem extends Component {
  static propTypes = {
    deleteTask: PropTypes.func.isRequired,
    task: PropTypes.instanceOf(Task).isRequired,
    updateTask: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      editing: false,
      time: 0,
      employee: '',
      service: '',
      job: '',
      note: ''
    };

    this.delete = ::this.delete;
    this.editTask = ::this.editTask;
    this.saveTask = ::this.saveTask;
    this.stopEditing = ::this.stopEditing;
    this.toggleStatus = ::this.toggleStatus;
    this.onKeyUp = ::this.onKeyUp;
    this.onChange = ::this.onChange;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.task !== this.props.task ||
           nextState.editing !== this.state.editing;
  }

  delete() {
    this.props.deleteTask(this.props.task);
  }

  editTask() {
    const task = this.props.task;
    this.setState({
      time: task.time,
      employee: task.employee,
      service: task.service,
      job: task.job,
      note: task.note
    });

    this.setState({editing: true});
  }

  saveTask(event) {
          const { task } = this.props;
          const value = event.target.value.trim();
              this.props.updateTask(task, {service: value });
              this.setState({service: event.target.value});
              this.props.updateTask(task, {employee: value });
              this.setState({employee: event.target.value});
              this.props.updateTask(task, {note: value });
              this.setState({note: event.target.value});
              this.props.updateTask(task, {job: value });
              this.setState({job: event.target.value});
              this.props.updateTask(task, {time: value });
              this.setState({time: event.target.value});


    this.stopEditing();

  }
  onChange(event) {

    switch (event.target.name){
      case "Service":
        this.setState({service: event.target.value});
        break;
      case "Employee":
        this.setState({employee: event.target.value});
        break;
      case "Note":
        this.setState({note: event.target.value});
        break;
      case "Job":
        this.setState({job: event.target.value});
        break;
      case "Time":
          this.setState({time: event.target.value});
          break;
      default:
        break;
    }

  }
  stopEditing() {
    this.setState({editing: false});

  }

  toggleStatus() {
    let checked = !this.props.task.completed;
    this.props.updateTask(this.props.task, {completed: checked});
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.saveTask(event);
    }
    else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  renderTitle(task) {
    return (
        <div className="taskItem">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title" ref={c => this.timeText = c}>
              <strong>Hours: </strong>{task.time}</h3><br/>
              </div>
                <div className="panel-body">
                  <div ref={c => this.jobText = c}>Job: {task.job}</div>
                  <div ref={c => this.serviceText = c}><h3><strong>Service: </strong></h3>{task.service}</div>
                  <div className="itemDescription" ref={c => this.noteText = c} >
                    <strong>notes: </strong>{task.note}</div>
                </div>
          </div></div>
          );
          }
  renderTask(task) {
    return (

        <div>
          <input
              id="Time"
              name="Time"
              autoComplete="off"
              className="TimeListI"
              maxLength="2"
              onKeyUp={this.onKeyUp}
              placeholder="Hours"
              ref={c => this.timeInput = c}
              type="number"
              value={this.state.time}
              onChange={this.onChange}
              onSubmit={this.saveTask}/>
        <input
        name="Employee"
        autoComplete="off"
        className="EmployeeListI"
        maxLength="64"
        onKeyUp={this.onKeyUp}
        placeholder="Employee"
        ref={c => this.employeeInput = c}
        type="text"
        id="Employee"
        onChange={this.onChange}
        onSubmit={this.saveTask}
        value={this.state.employee}/>
          <input
              id="Job"
              name="Job"
              autoComplete="off"
              className="JobListI"
              maxLength="64"
              onSubmit={::this.saveTask}
              onKeyUp={this.onKeyUp}
              placeholder="Job"
              ref={c => this.jobInput = c}
              type="text"
              onChange={this.onChange}
              value={this.state.job}/>
    <input
    name="Service"
    autoComplete="off"
    className="ServiceListI"
    maxLength="64"
    onSubmit={::this.saveTask}
    onKeyUp={this.onKeyUp}
    placeholder="Service"
    ref={c => this.serviceInput = c}
    type="text"
    id="Service"
    onChange={this.onChange}
    value={this.state.service}/>
          <input
    id="Note"
    name="Note"
    autoComplete="off"
    className="NoteListI"
    maxLength="64"
    onSubmit={this.saveTask}
    onKeyUp={this.onKeyUp}
    placeholder="Note"
    ref={c => this.noteInput = c}
    type="text"
    value={this.state.note}
    onChange={this.onChange}
          />
</div>
    );
  }

  render() {
    const { editing } = this.state;
    const { task } = this.props;

    return (
      <div className={classNames('task-item', {'task-item--completed': task.completed, 'task-item--editing': editing})} tabIndex="0">
        <div className="cell">
          <button
            aria-hidden={editing}
            aria-label="Mark task as completed"
            className={classNames('btn task-item__button', {'hide': editing})}
            onClick={this.toggleStatus}
            ref={c => this.toggleStatusButton = c}
            type="button">
            <svg className={classNames('icon', {'icon--active': task.completed})} width="24" height="24" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </button>
        </div>

        <div className="cell">
          {editing ? this.renderTask(task) : this.renderTitle(task)}
        </div>

        <div className="cell">
          <button
            aria-hidden={!editing}
            aria-label="Cancel editing"
            className={classNames('btn task-item__button', {'hide': !editing})}
            onClick={this.stopEditing}
            ref={c => this.cancelEditButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </button>
          <button
            aria-hidden={editing}
            aria-label="Edit task"
            className={classNames('btn task-item__button', {'hide': editing})}
            onClick={this.editTask}
            ref={c => this.editButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
          <button
            aria-hidden={editing}
            aria-label="Delete task"
            className={classNames('btn task-item__button', {'hide': editing})}
            onClick={this.delete}
            ref={c => this.deleteButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default TaskItem;
