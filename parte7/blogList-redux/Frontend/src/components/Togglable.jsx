import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

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
        <Button className='mt-2 mb-2' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showVisibility}>
        {props.children}
      </div>
      <Button onClick={toggleVisibility}>Cancel</Button>
    </div>
  )
})

Togglable.displayName = Togglable

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
