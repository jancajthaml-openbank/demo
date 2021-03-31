import React from "react"
import { withRouter, NavLink } from "react-router-dom"

function SafeLink(props) {
  const { children, history, to, staticContext, match, ...rest } = props

  return (
    <React.Fragment>
      {history.location.pathname === to
        ? <span>{children}</span>
        : <NavLink {...{to, ...rest}}>{children}</NavLink>
      }
    </React.Fragment>
  )
}

export default withRouter(SafeLink)
