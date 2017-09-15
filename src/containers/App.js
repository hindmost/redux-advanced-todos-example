import React, {Component} from 'react'
import {connect} from 'react-redux'
import TodoList from '../components/TodoList'
import Filter from '../components/Filter'
import TodoForm from './TodoForm'
import {
  doModeToggle, doTodoDelete, doTodoComplete, doFormEditToggle, doFilterApply,
  FILTER_VAL_ALL, FILTER_VAL_ACTIVE, FILTER_VAL_COMPLETED
} from '../actions'
import './App.css'

class App extends Component {
  tabClass(stored, curr) {
    return 'tab-pane' + (stored === curr? ' active' : '')
  }

  render() {
    let {mode, formEditId, onChangeTab} = this.props
    return (
      <div>
        <div className="page-header">
            <h1 className="text-center">Advanced Todos</h1>
        </div>
        <div>
          <ul className="nav nav-pills nav-justified">
            {['Todo List', formEditId? 'Edit Todo' : 'New Todo'].map((title, i) => 
              <li role="presentation" className={mode === i? 'active' : null}>
                  <a href="#" aria-controls="home" role="tab" onClick={ (e) => {e.preventDefault(); onChangeTab(i)} }>{title}</a>
              </li>
            )}
          </ul>
          <div className="tab-content">
            <div role="tabpanel" className={this.tabClass(mode, 0)}>
              <TodoList {...this.props} />
              <Filter {...this.props} />
            </div>
            <div role="tabpanel" className={this.tabClass(mode, 1)}>
              <TodoForm {...this.props} />
            </div>
          </div>
        </div>
      </div>)
  }
}


function filterList (list, filter) {
  switch (filter) {
    case FILTER_VAL_ALL:
      return list
    case FILTER_VAL_ACTIVE:
      return list.filter(item => !item.completed)
    case FILTER_VAL_COMPLETED:
      return list.filter(item => item.completed)
  }
}

function mapStateToProps (state) {
  return {
    mode: state.mode,
    list: filterList(state.list, state.listFilter),
    filter: state.listFilter,
    formEditId: state.formEditId
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onChangeTab: (v) => {
      dispatch(doModeToggle(v))
    },
    onEditItem: (id) => {
      dispatch(doModeToggle(1))
      dispatch(doFormEditToggle(id))
    },
    onRemoveItem: (id) => {
      dispatch(doTodoDelete(id))
    },
    onCompleteItem: (id) => {
      dispatch(doTodoComplete(id))
    },
    onAfterSubmitForm: () => {
      dispatch(doModeToggle(false))
    },
    onFilter: (v) => {
      dispatch(doFilterApply(v))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
