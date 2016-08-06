import React, { Component, PropTypes } from 'react'
import SearchBar from '../components/SearchBar'

export default class AppPage extends Component {

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState)
  }

  onSearch = (event) => {
    console.log(event.target.value)
  }

  render() {
    return (
      <div>
        <SearchBar onChange={this.onSearch} />
        hahaha
      </div>
    )
  }


}

AppPage.propTypes = {
  params: PropTypes.object.isRequired,
}
