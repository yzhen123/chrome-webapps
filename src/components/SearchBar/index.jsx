import './style.scss'
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'

export default class SearchBar extends Component {

  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  render() {
    var btnClearCls = [
      'btn-clear',
      this.state.value ? '' : 'hide'
    ].join(' ')

    return (
      <Form className="search-bar">
        <Input onChange={this.onChange} value={this.state.value}/>
        <Link to="/config">
          <Button variant="flat" color="primary">
            <i className="fa fa-bars"/>
          </Button>
        </Link>
        <Button type="button" className={btnClearCls} variant="flat" onClick={this.clearInput}>
          <i className="fa fa-close"></i>
        </Button>
      </Form>
    )
  }

  onChange = (event) => {
    console.log(this);
    this.props.onChange && this.props.onChange(event)
    this.setState({value: event.target.value})
  }

  clearInput = () => {
    this.setState({value: ''})
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func
}
