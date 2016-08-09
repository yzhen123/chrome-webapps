import styles from './style.scss'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'

class SearchBar extends Component {

  state = {
    value: '',
  }

  onChange = (event) => {
    if (this.props.onChange) this.props.onChange(event)
    this.setState({ value: event.target.value })
  }

  clearInput = () => {
    this.setState({ value: '' })
  }

  render() {
    const btnClearCls = [
      'btn-clear',
      this.state.value ? '' : 'hide',
    ].join(' ')
    return (
      <Form className={styles.searchBar}>
        <Input onChange={this.onChange} value={this.state.value} />
        <Link to="/config">
          <Button variant="flat" color="primary">
            <i className="fa fa-bars" />
          </Button>
        </Link>
        <Button type="button" className={btnClearCls} variant="flat" onClick={this.clearInput}>
          <i className="fa fa-close"></i>
        </Button>
      </Form>
    )
  }

}

SearchBar.propTypes = {
  onChange: PropTypes.func,
}

export default connect()(SearchBar)
