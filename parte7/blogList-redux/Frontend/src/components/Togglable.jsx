import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false)

  const hiddenVisibility = { display: visibility ? 'none' : '' }
  const showVisibility = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hiddenVisibility}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showVisibility}>
        {props.children}
      </div>
      <button onClick={toggleVisibility}>Cancel</button>
    </div>
  )
})

Togglable.displayName = Togglable

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
