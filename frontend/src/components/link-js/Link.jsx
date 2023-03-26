import React, { useCallback } from 'react'
import css from './Link.module.css'

function AHrefJavascript({ children, onClick, ...props }) {
  const handleClick = useCallback(
    e => {
      e.preventDefault()
      if (onClick) {
        return onClick(e)
      }
    },
    [onClick]
  )

  return (
    <a href='#javascript' {...props} onClick={handleClick}>
      {children}
    </a>
  )
}

export default AHrefJavascript
