import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false)

  const hiddenVisibility = { display: visibility ? 'none' : '' }
  const showVisibility = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return {toggleVisibility}
  })

  return(
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

export default Togglable

