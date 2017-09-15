// define action types
export const MODE_TOGGLE = 'MODE_TOGGLE'
export const TODO_PUT = 'TODO_PUT'
export const TODO_DELETE = 'TODO_DELETE'
export const TODO_COMPLETE = 'TODO_COMPLETE'
export const FORM_UPDATE = 'FORM_UPDATE'
export const FORM_EDIT_TOGGLE = 'FORM_EDIT_TOGGLE'
export const FILTER_APPLY = 'FILTER_APPLY'
export const FILTER_VAL_ALL = 0
export const FILTER_VAL_ACTIVE = 1
export const FILTER_VAL_COMPLETED = 2

export const doModeToggle = (value) => {
  return { type: MODE_TOGGLE, value }
}

export const doTodoPut = (data) => {
  return { type: TODO_PUT, data }
}

export const doTodoDelete = (id) => {
  return { type: TODO_DELETE, id }
}

export const doTodoComplete = (id) => {
  return { type: TODO_COMPLETE, id }
}

export const doFormUpdate = (data, errors) => {
  return { type: FORM_UPDATE, data, errors }
}

export const doFormEditToggle = (id) => {
  return { type: FORM_EDIT_TOGGLE, id }
}

export const doFilterApply = (value) => {
  return { type: FILTER_APPLY, value }
}
