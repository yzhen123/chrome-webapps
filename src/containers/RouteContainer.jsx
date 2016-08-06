import React from 'react'

export default function RouteContainer({ children }) {
  return (
    <main>{children}</main>
  )
}
RouteContainer.propTypes = {
  children: React.PropTypes.node,
}
