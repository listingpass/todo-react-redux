import React, { Component, PropTypes } from 'react';
import CmmAC from '../autosuggest/employeeAS';
import cmmData from '../autosuggest/cmmdata';

class TaskForm extends Component {
    static propTypes = {
    createTask: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
      this.employee = 'unset';
      this.cmm = 'unset';
      this.service = 'unset';
      this.job = 'unset';
      this.employeeValue = 'unset';
      this.cmmValue = 'unset';
      this.serviceValue = 'unset';
      this.jobValue = 'unset';
      this.jobs = cmmData.jobs;
      this.employees = cmmData.employees;
      this.services = cmmData.service_item_list;
      this.cmmitems = cmmData;
    this.state = {
        cmmitems:cmmData,
        autoCompleteValue: '',
        employee:this.employee,
        job:this.job,
        service:this.service,
        employeeValue:this.employeeValue,
        jobValue:this.serviceValue,
        serviceValue:this.serviceValue,
        title: 'Set Title',
        cmmjobs: cmmData.jobs,
        cmmservices: cmmData.service_item_list,
        cmmpayroll: cmmData.payroll_items,
        cmmemployees: cmmData.employees,
        cmmbillingrate: cmmData.billing_rate_level,
        cmmwc: cmmData.wc_list,
        cmmdata:cmmData.employees,
        cmmtype:"jobs",};

    this.onChange = ::this.onChange;
    this.onKeyUp = ::this.onKeyUp;
    this.onSubmit = ::this.onSubmit;
  }
    clearInput() {
    // this.setState({title: ''});

    console.log('cleared input');
  }
    employeeSelect(event, value) {
        // Update input box
        this.setState({employeeValue: event.target.value});
    }
    serviceSelect(event, value) {
        // Update input box
        this.setState({serviceValue: event.target.value});
    }
    jobSelect(event, value) {
        // Update input box
        this.setState({jobValue: event.target.value});
    }
    handleSelect(event, value) {
        // Update input box
        this.setState({autoCompleteValue: event.target.value});
    }
    employeeChange(event, value) {
        // Update input box
        this.setState({employeeValue: event.target.value});
    }
    serviceChange(event, value) {
        // Update input box
        this.setState({serviceValue: event.target.value});
    }
    jobChange(event, value) {
        // Update input box
        this.setState({jobValue: event.target.value});
    }
    handleChange(event, value) {
        // Update input box
        this.setState({autoCompleteValue: event.target.value});
    }
  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }
  createNew(event) {
      event.preventDefault();
      const title = this.state.jobValue;
      // if (title.length)
          this.props.createTask;
      // (this.state.employeeValue + " @ " + this.state.job, this.state.employeeValue, this.state.serviceValue, this.state.jobValue);
      console.log('---- title: ' + this.state.employeeValue + " @ " + this.state.jobValue + ' performed service ' + this.state.serviceValue);
      this.clearInput();
  }
  onSubmit(event){
      console.debug('Submit passed and ignored ' + event);
  }
  render() {
    return (
      <form className="task-form" onSubmit={::this.onSubmit} noValidate>
          <CmmAC className="Employee" id="Employee" ref="Employee" autoCompleteValue={this.state.employeeValue} handleChange={::this.employeeChange} onSubmit={this.onSubmit} handleSelect={::this.employeeSelect}/>
          <CmmAC  id="Service" ref="Service" autoCompleteValue={this.state.serviceValue} handleSelect={::this.serviceSelect} onSubmit={this.onSubmit} handleChange={::this.serviceChange}/>
          <CmmAC  items={this.jobs} id="Job" ref="Job" autoCompleteValue={this.state.jobValue} handleSelect={::this.jobSelect} handleChange={::this.jobChange} onSubmit={this.onSubmit}/>
          <button onSubmit={::this.createNew}>Submit</button>
      </form>
    );
  }
}
export default TaskForm;
