import React, { Component, PropTypes } from 'react'
import SearchBar from '../components/SearchBar'

export default class AppPage extends Component {

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState)
  }

  render() {
    return (
      <div>
        <SearchBar />

      </div>
    )
  }


}

AppPage.propTypes = {
  params: PropTypes.object.isRequired,
}
