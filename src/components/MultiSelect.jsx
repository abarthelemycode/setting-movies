import React, { Component } from 'react';

class MultiSelect extends Component {


  constructor(props) {
    super(props);
    this.handlerParent = this.props.updateState.bind(this)
  }

  selectCategory(e){
    let value = e.target.value
    let categoriesSelected = this.props.stateSelect.categoriesSelected
    let index = categoriesSelected.indexOf(value)
    if(index > -1){
      categoriesSelected.splice(index, 1)
    } else {
      categoriesSelected.push(e.target.value)
    }
    let newState = { actualPage:1, categoriesSelected : categoriesSelected }
    this.handlerParent(newState)
  }

  isChecked(value){
    let index = this.props.stateSelect.categoriesSelected.indexOf(value)
    return (index === -1) ? false : true;
  }

  displayOptions = value => {
    return (
      <div key={ value } className="form-check form-check-inline ">
        <input className="form-check-input" onChange={ this.selectCategory.bind(this)} checked={ this.isChecked(value )}name="category" type="checkbox" id={value} value={value} />
        <label className="form-check-label" htmlFor={ value }>{value}</label>
      </div>
    )
  }

  render() {
    const options = this.props.stateSelect.categories.map(this.displayOptions)

    return (
      <div className="row multiselect">
        <div className="col">
          <h6>Selectionner une ou des catégories</h6>
          <div>{ options }</div>
        </div>
      </div>
    );
  }
}

export default MultiSelect;
