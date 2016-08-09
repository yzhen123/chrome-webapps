import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import SearchBar from '../components/SearchBar'

class AppPage extends Component {
  componentWillMount() {
    this.props.loadApps()
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState)
  }

  render() {
    const { apps } = this.props
    return (
      <div>
        <SearchBar />
        {apps.map(app => <span>{app.name}</span>)}
      </div>
    )
  }

}

AppPage.propTypes = {
  params: PropTypes.object.isRequired,
  apps: PropTypes.array.isRequired,
}

export default connect(
  state => Object.assign({ apps: state.apps }),
  actionCreators)(AppPage)
