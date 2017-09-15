import React, {Component} from 'react';
import {connect} from 'react-redux'
import ReduxFormHelper from 'redux-form-helper'
import FieldErrorBlock from '../components/FieldErrorBlock'
import {doTodoPut, doFormUpdate} from '../actions'

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.helper = new ReduxFormHelper(props)
    this.helper.resetForm();
  }

  fieldClass(name, errors) {
    return 'form-group' + (errors[name]? ' has-error': '')
  }

  onChange(e) {
    this.helper.processField(e)
  }

  onSubmit(e) {
    e.preventDefault()
    let {onSubmitForm, onAfterSubmitForm} = this.props
    let ret = this.helper.processForm(e)
    ret && (onSubmitForm(ret), this.helper.resetForm(), onAfterSubmitForm && onAfterSubmitForm())
  }

  render() {
    let {formData, formErrors} = this.props

    return (
  <div>
    {!!formErrors._flag &&
        <div className="alert alert-success" role="alert">
          Please fill in the fields below with correct values
        </div>
    }
    <form name="TodoForm" onSubmit={this.onSubmit.bind(this)} >
      <input type="hidden" className="form-control" name="id" value={formData.id} />
      <div className={this.fieldClass('title', formErrors)}>
        <label>Title *</label>
        <input type="text" className="form-control" name="title" value={formData.title} onChange={this.onChange.bind(this)} />
        <FieldErrorBlock {...this.props} name='title' text='Must contain 2-16 characters' />
      </div>

      <div className="form-group">
        <label>Importance Level</label>
        <select className="form-control" name="level" value={formData.level}>
          {['None', 'Medium', 'High'].map((title, i) => 
            <option value={i}>{title}</option>
          )}
        </select>
      </div>

      <div className={this.fieldClass('description', formErrors)}>
        <label>Description</label>
        <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={this.onChange.bind(this)}></textarea>
        <FieldErrorBlock {...this.props} name='description' text='Must contain max. 120 characters' />
      </div>

      <div className={this.fieldClass('deadline', formErrors)}>
        <label>Deadline date</label>
        <input type="date" className="form-control" name="deadline" value={formData.deadline} onChange={this.onChange.bind(this)} />
        <FieldErrorBlock {...this.props} name='deadline' text='Must be a date in yyyy.mm.dd format' />
      </div>

      <button type="submit" className="btn btn-default">{formData.id? 'Update' : 'Create'}</button>
    </form>
  </div>
    )
  }
}

function testDate (v) {
  return /^(?:\d{4}[.\-\/]\d{2}[.\-\/]\d{2}|\d{1,2}[.\-\/]\d{2}[.\-\/]\d{4})$/.test(v)
}

function testLength (v, min, max) {
  return (!min || v.length >= min) && (!max || v.length <= max)
}

const formModel = {
  id: { numeric: true },
  title: { required: true, validate: (v) => testLength(v, 2, 16) },
  description: { validate: (v) => testLength(v, 0, 120) },
  level: { numeric: true },
  deadline: { validate: testDate }
}

function mapStateToProps (state) {
  return {
    formData: state.formData, formErrors: state.formErrors,
    formModel
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onUpdateForm: (data, errors) => {
      dispatch(doFormUpdate(data, errors))
    },
    onSubmitForm: (data) => {
      dispatch(doTodoPut(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
