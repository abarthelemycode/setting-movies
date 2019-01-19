import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLiked : false,
      isDisLiked : false,
    };

    this.deleteCard = this.props.deleteCard
  }

  handleLike = (property) => {
    this.setState((prevState) => {
      let value = !prevState[property]
      let state = { isLiked: false, isDisLiked: false }
      state[property] = value
      return state;
    })
  }

  render() {
    const isLiked = this.state.isLiked
    const isDisLiked = this.state.isDisLiked

    const likes = this.props.movie.likes + (isLiked ? 1 : 0)
    const dislikes = this.props.movie.dislikes + (isDisLiked ? 1 : 0)

    return (
      <div className="card movie-card" >
        <div className="card-body">
          <FontAwesomeIcon icon="times-circle" className="float-right delete-button" onClick={ this.deleteCard.bind(this,this.props.movie.id) }  />
          <h5 className="card-title">{ this.props.movie.title }</h5>
          <h6 className="card-subtitle mb-2 text-muted">{ this.props.movie.category }</h6>
          <div className="float-right">
            <FontAwesomeIcon onClick={ this.handleLike.bind(this, "isLiked") }
              className="like-icon" color={ isLiked ? "blue" : "black"} icon="thumbs-up"/>
            <span className="text-like">{ likes }</span>
            <FontAwesomeIcon  onClick={ this.handleLike.bind(this, "isDisLiked") }  transform="down-6"
              className="like-icon" color={ isDisLiked ? "blue" : "black"} icon="thumbs-up" flip="both"/>
            <span className="text-like">{ dislikes }</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
