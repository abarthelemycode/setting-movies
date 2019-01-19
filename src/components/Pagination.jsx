import React, { Component } from 'react';

class Pagination extends Component {

  constructor(props) {
    super(props);
    this.handlerParent = this.props.updateState.bind(this)
  }

   handleChange = e => {
     this.setState({ nbElement: e.target.value });
   };

  changePage(page){
    let newState = { actualPage : page }
    this.handlerParent(newState)
  }

  changeNbElement = e => {
    let newState = { actualPage : 1, elementByPage : e.target.value }
    this.handlerParent(newState)
  }


  isPrev = value => {
    let actualPage = this.props.statePage.actualPage
    if(actualPage === 1){
      return
    }
    return (
      <button type="button" className="btn btn-secondary pg-prev" onClick={ this.changePage.bind(this, actualPage - 1) }>Precedent</button>
    )
  }

  isNext  = value => {
    let actualPage = this.props.statePage.actualPage
    let totalPage = this.props.statePage.totalPage
    if(actualPage === totalPage){
      return
    }
    return (
      <button type="button" className="btn btn-secondary pg-next" onClick={ this.changePage.bind(this, actualPage + 1) }>Suivant</button>
    )
  }

  render() {
    const nbElement = this.props.statePage.elementByPage

    return (
      <div className="row pagination align-items-center">
        <div className="col-md-6" role="group" >
          <h6>Réorganiser les élements par :</h6>
          <div className="btn-group btn-group-toggle">
            <label className={"btn btn-secondary " + (nbElement === "4" ? "active" : "")}>
                <input name="nbElement" value="4"
                    checked={nbElement === "4"}
                    onChange={this.changeNbElement}
                    type="radio"/>4
            </label>
            <label className={"btn btn-secondary " + (nbElement === "8" ? "active" : "")}>
                <input name="nbElement" value="8"
                  checked={nbElement === "8"}
                  onChange={this.changeNbElement}
                  type="radio"/>8
            </label>
            <label className={"btn btn-secondary " + (nbElement === "16" ? "active" : "")}>
                <input name="nbElement" value="16"
                  checked={nbElement === "16"}
                  onChange={this.changeNbElement}
                  type="radio"/>16
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="float-left">{ this.isPrev()}</div>
          <div className="float-right">{ this.isNext()}</div>
        </div>
      </div>
    );
  }
}

export default Pagination;
