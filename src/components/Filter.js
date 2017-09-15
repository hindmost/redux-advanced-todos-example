import React from 'react'
import {FILTER_VAL_ALL, FILTER_VAL_ACTIVE, FILTER_VAL_COMPLETED} from '../actions'

const filterOpts = [
  ['All', FILTER_VAL_ALL], ['Active', FILTER_VAL_ACTIVE], ['Done', FILTER_VAL_COMPLETED]
];
const Filter = ({ filter, onFilter }) => (
  <div className="text-center">
    <div className="btn-group text-center" role="group" aria-label="...">
      {filterOpts.map(([title, v], i) => 
        <button type="button" className={'btn btn-default' + (filter === i? ' active' : '')} onClick={(e) => { e.target.blur(); onFilter(v) }} >{title}</button>
      )}
    </div>
  </div>
)

export default Filter
