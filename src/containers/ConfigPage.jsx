import React, { Component } from 'react'

export default class ConfigPage extends Component {

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState)
  }

  render() {
    return (
      <div> Config! </div>
    )
  }

}
