import {
  MODE_TOGGLE, TODO_PUT, TODO_DELETE, TODO_COMPLETE,
  FORM_UPDATE, FORM_EDIT_TOGGLE, FILTER_APPLY
} from '../actions'
import {assign, defaults, pick} from 'lodash'

const initialState = {
  mode: 0,
  list: [],
  listCount: 0,
  listFilter: 0,
  formData: {
    id: 0,
    title: '',
    level: 0,
    description: '',
    deadline: ''
  },
  formErrors: {
  },
  formEditId: 0
}

const todoKeys = [
  'title', 'level', 'description', 'deadline'
]

export default function todos (state = {}, action) {
  const ret = defaults(assign({}, state), initialState)
  const {list, listCount, formData, formErrors} = ret
  let id
  switch (action.type) {
    case MODE_TOGGLE:
      const mode = action.value
      if (mode) return {
        ...ret,
        mode: 1,
        formData: assign({}, initialState.formData),
        formErrors: {},
        formEditId: 0
      }
      return {
        ...ret,
        mode: 0,
        formEditId: 0
      }
    case TODO_PUT:
      if (!action.data) return ret
      if (id = action.data.id) return {
        ...ret,
        list: list.map((item) =>
          item.id === id? pick(action.data, ['id'].concat(todoKeys)) : item
        )
      }
      return {
        ...ret,
        list: [...list,
          assign({id: listCount+1, completed: false}, pick(action.data, todoKeys))
        ],
        listCount: listCount+1
      }
    case TODO_DELETE:
      if (id = action.id) return {
        ...ret,
        list: list.filter((item) => item.id !== id)
      }
      return ret
    case TODO_COMPLETE:
      if (id = action.id) return {
        ...ret,
        list: list.map((item) =>
          item.id === id? {...item, completed: !item.completed} : item
        )
      }
      return ret
    case FORM_UPDATE:
      return {
        ...ret,
        formData: assign({}, formData, action.data || {}),
        formErrors: assign({}, formErrors, action.errors || {})
      }
    case FORM_EDIT_TOGGLE:
      if (!action.id) return ret
      id = action.id
      const found = list.filter((item) => item.id === id)
      if (!found.length) return ret
      return {
        ...ret,
        formData: pick(found[0], ['id'].concat(todoKeys)),
        formEditId: id
      }
    case FILTER_APPLY:
      return {
        ...ret,
        listFilter: action.value
      }
    default:
      return ret
  }
}
