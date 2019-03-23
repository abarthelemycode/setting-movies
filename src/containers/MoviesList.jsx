import React, { Component } from 'react';
import { Card, MultiSelect, Pagination } from 'components'
import { movies$ }  from '../data/movies'


class MoviesList extends Component {

  constructor(){
    super()
    this.state = {
      movies :[],
      moviesDisplayed:[],

      categories : [],
      categoriesSelected: [],

      actualPage : 1,
      totalPage : 1,
      elementByPage: "16"
    }

    movies$.then((value) => {
      let categories = this.getCategories(value)
      this.setState(
      {
        movies: value,
        categories: categories,
        categoriesSelected : categories
      }, this.updateContent )
    })
  }

  getCategories(movies) {
    let array = movies.map(item => item.category)
    let categories = array.filter(function(item, pos) { return array.indexOf(item) === pos })
    return categories
  }


  updateContent(){
    let movies = this.state.movies
    let categories = this.getCategories(movies)

    let moviesDisplayed = []
    let categoriesSelected = this.state.categoriesSelected
    moviesDisplayed = movies.filter(function(item) { return categoriesSelected.includes(item.category)});

    let actualPage = this.state.actualPage
    let nbElement = this.state.elementByPage
    let totalPage = Math.ceil( moviesDisplayed.length / this.state.elementByPage)

    let indexBegin = (actualPage - 1) * nbElement
    let indexEnd = (actualPage * nbElement) - 1
    moviesDisplayed = moviesDisplayed.filter((item, index) => (indexBegin <= index) && (index <= indexEnd))

    let newState = {
      categories: categories,
      moviesDisplayed: moviesDisplayed,
      totalPage: totalPage,
    }

    this.setState(newState)
  }

  deleteCard = (id) => {
    const filteredItems = this.state.movies.filter(item => item.id !== id)
    this.setState({ movies: filteredItems }, this.updateContent )
  }

  updateState = (newState) => {
    this.setState(newState, this.updateContent)
  }

  displayCard = item => {
    return (<Card key={ item.id } movie={ item } deleteCard={this.deleteCard} />)
  }

  render() {
    const listCard = this.state.moviesDisplayed.map(this.displayCard)

    const stateSelect = {
      categories : this.state.categories,
      categoriesSelected : this.state.categoriesSelected,
    }

    const statePage = {
      actualPage : this.state.actualPage,
      totalPage : this.state.totalPage,
      nbElement : this.state.moviesDisplayed.length,
      elementByPage: this.state.elementByPage,
    }

    return (
      <div className="container">
        <MultiSelect stateSelect={ stateSelect } updateState={this.updateState} />
        <Pagination statePage={ statePage } updateState={this.updateState} />

        <div className="row mx-auto">
          {listCard}
        </div>
      </div>
    );
  }
}

export default MoviesList;
