import styles from './style.scss'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions'
import SearchBar from '../../components/SearchBar'

class AppPage extends Component {
  componentWillMount() {
    this.props.loadApps()
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState)
  }

  render() {
    const { apps, launchApp } = this.props
    return (
      <div>
        <SearchBar />
        <div className={styles.appPage}>
          {apps.result.map(id => {
            const app = apps.entities.apps[id]
            return (
              <div className="app" key={id} onClick={(e) => launchApp(app)}>
                <img src={app.icon} alt={app.shortName} className="icon" />
                <div className="name">{app.shortName}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

}

AppPage.propTypes = {
  params: PropTypes.object.isRequired,
  apps: PropTypes.object.isRequired,
  loadApps: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadApps: () => dispatch(loadApps()),
    launchApp: apps => dispatch(launchApp(apps)),
  }
}

export default connect(
  state => Object.assign({ apps: state.apps }),
  actionCreators)(AppPage)
